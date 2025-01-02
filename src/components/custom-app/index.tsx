import appImage from "@/images/app-image.png";
import { getDappById } from '@/services/dapp';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import HeadComponent from "../scan-dapps/common/head";

interface CodeBlocks {
  html: string;
}

const CustomApp = () => {
  const app = {
    name: "Bot Assistant",
    image: appImage,
    description: "A GPT specialized in generating and refining images with a mix of professional and friendly tone.",
  };

  const dappId = useSearchParams().get("appId");
  const [appData, setAppData] = useState<any>(app);
  const [codeBlocks, setCodeBlocks] = useState<CodeBlocks>({ html: '' });
  const [response, setResponse] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const extractCodeBlocks = (text: string): CodeBlocks => {
    // Format the HTML content helper function
    const formatHtmlContent = (html: string) => {
      return html
        .replace(/'\s*\+\s*'/g, '')
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
    };

    // First check if the text is a JSON string containing HTML
    try {
      const parsedJson = JSON.parse(text);
      if (parsedJson && parsedJson.html) {
        return { html: formatHtmlContent(parsedJson.html) };
      }
    } catch (e) {
      // If JSON parsing fails, continue with other extraction methods
    }

    // Try to find content between ```html tags
    let htmlMatch = text.match(/```html([\s\S]*?)```/);

    // If that doesn't work, try to find content between <antArtifact> tags
    if (!htmlMatch) {
      htmlMatch = text.match(/<antArtifact[^>]*type="text\/html"[^>]*>([\s\S]*?)<\/antArtifact>/);
    }

    // If we find a match, clean it up and return it
    if (htmlMatch) {
      return { html: formatHtmlContent(htmlMatch[1].trim()) };
    }

    // If no matches found, return empty string
    return { html: '' };
  };

  useEffect(() => {
    if (!dappId) return;

    getDappById(dappId).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setAppData({
          name: data.title || "Bot Assistant",
          image: data.logo || appImage,
          description: data.description ||
            "A GPT specialized in generating and refining images with a mix of professional and friendly tone.",
        });

        const assistantContent = data.content.find(item => item.role === "assistant")?.content;
        if (assistantContent) {
          console.log('Raw assistant content:', assistantContent);
          setResponse(assistantContent);
          const extracted = extractCodeBlocks(assistantContent);
          console.log('Extracted HTML:', extracted);
          setCodeBlocks(extracted);
        }
      }
    }).catch(error => {
      console.error('Error fetching dapp:', error);
    });
  }, [dappId]);

  // useEffect(() => {
  //   if (!iframeRef.current || !codeBlocks.html) {
  //     console.log('No iframe ref or HTML content');
  //     return;
  //   }

  //   const iframe = iframeRef.current;
  //   iframe.style.minHeight = '600px';

  //   const setupIframe = () => {
  //     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  //     if (!iframeDoc) {
  //       console.log('No iframe document');
  //       return;
  //     }

  //     try {
  //       iframeDoc.open();

  //       // Inject a base tag to handle relative URLs correctly
  //       const htmlContent = codeBlocks.html
  //         .replace('<head>', '<head><base target="_parent">')
  //         .replace(/\\n/g, '\n')
  //         .replace(/\\"/g, '"')
  //         .replace(/\\\\/g, '\\');

  //       iframeDoc.write(htmlContent);
  //       iframeDoc.close();

  //       // Add resize observer to handle dynamic content
  //       if (iframe.contentWindow) {
  //         const resizeObserver = new ResizeObserver(() => {
  //           if (iframe.contentWindow) {
  //             const height = iframe.contentWindow.document.documentElement.scrollHeight;
  //             iframe.style.height = `${height}px`;
  //           }
  //         });
  //         resizeObserver.observe(iframeDoc.body);
  //       }
  //     } catch (error) {
  //       console.error('Error setting up iframe:', error);
  //     }
  //   };

  //   // Setup the iframe once it's loaded
  //   iframe.addEventListener('load', setupIframe);

  //   // Initial setup
  //   setupIframe();

  //   // Cleanup
  //   return () => {
  //     iframe.removeEventListener('load', setupIframe);
  //   };
  // }, [codeBlocks.html]);

  if (!dappId) {
    return <div>wrong id</div>;
  }

  return (
    <div className='flex flex-col md:gap-8 gap-4 pb-20 w-full'>
      <HeadComponent icon={appData?.image} title={appData?.name} />
      <div className="flex items-center justify-center h-screen w-full p-4">
        {response ? (
          <iframe
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms"
            title="Custom Application"
            srcDoc={codeBlocks.html}
          />
        ) : (
          <div role="status" className="animate-pulse flex items-center w-full h-full flex-1">
            <div className="flex items-center justify-center w-screen h-screen bg-gray-300 rounded dark:bg-gray-700">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomApp;