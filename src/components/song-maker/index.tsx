import React, { useEffect, useState } from 'react'
import song from '@/images/song.svg'
import HeadComponent from '../scan-dapps/common/head'
import { Textarea } from '../ui/textarea'
import send from "@/images/send.svg";
import { Button } from '../ui/button';
import Image from 'next/image';
import { SongMakerService } from '@/services/song-maker';
import { SongByTaskId, SongMaker } from '@/types/song-maker';
import { triggerToast } from '@/utils/trigger-toast';
const SongMakerApp = () => {

    const [prompt, setPrompt] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [audio, setAudio] = useState<string[]>([]);
    
    const createMusic = async (): Promise<SongMaker | undefined> => {
        try {
            if (!prompt) return;
            const result = await SongMakerService.createSong(prompt);
            return result.data;
        } catch (e) { 
            console.log('---error in createMusic', e);
            throw new Error('Error creating music')
        }
    }

    const getMusicByTaskId = async (taskId: string) => {
        try {
            if (!taskId) return;
            const result = await SongMakerService.getSongByTaskId(taskId);
            return result.data;
        } catch (e) {
            console.log('---error in get music by taskId', e);
            throw new Error('Error get music')
        }
    }

    const processCreateAudioMusic = async () => {
        try {
          
            setIsProcessing(true)

            const musicRecord = await createMusic();
            if (!musicRecord) {
                setIsProcessing(false);
                return;
            };
            const result: SongByTaskId = await getMusicByTaskId(musicRecord.task_id);
            console.log('---resusing music', result)
            if (!result) {
                setIsProcessing(false);
                return;
            }

            if (!result.output_data) {
                const outPut = await handleRetryGetSongByTaskId(musicRecord.task_id);
                if (outPut && outPut.output_data && outPut.output_data.data) { 
                    setAudio(outPut.output_data.data.map((item)=> item.audio_url))
                    setIsProcessing(false);
                }
            }
            return;
        } catch (e) { 
            setIsProcessing(false);
            triggerToast('error', 'Create audio music failed')
            console.log('error in processing audio music')
        }
    }

    useEffect(() => {
        if (!prompt) {
            setAudio([])
        }
    },[prompt])

    const handleRetryGetSongByTaskId = async (task_id: string): Promise<SongByTaskId | null> => { 
        try {
            let count = 0;
            while (count <= 40) {
                const result = await getMusicByTaskId(task_id);
                if (result?.output_data && result.output_data.msg !== 'Running... ') {
                    return result;
                }
                count++;
                await new Promise(resolve => setTimeout(resolve, 5000));  // Delay between retries
            }
            console.error('Max retry attempts reached for task_id:', task_id);
            return null;
        } catch (err: any) {
            console.log('err retry');
            throw new Error(err.message)
        }
    }

    return (
        <div className='pb-10 lg:pb-0'>
            <HeadComponent icon={song} title='Song Maker' />
            <section className='px-4 lg:px-0'>
                <div className='bg-[#fff] w-full lg:w-[660px] relative h-[500px] overflow-y-scroll mx-auto border border-[#D8D8D8] rounded-2xl lg:mt-10 p-5'>
                    <button className={`rounded-[999px] w-[100px] ml-auto block bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] p-[3px]`}>
                        <div className={`w-full rounded-full py-1 flex justify-center items-center bg-[#1B1B1B] text-white`}>
                            v3.5
                        </div>
                    </button>
                    <form className='my-10'>
                        <span className='mb-4 inline-block text-sm font-semibold'>Song Description</span>
                        <div
                            className="h-[112px] rounded-3xl p-0.5"
                            style={{
                                background: "linear-gradient(to right, #6767FF, #F06DFF)",
                            }}
                        >
                            <div className="relative rounded-[22px] bg-white p-0">
                                <Textarea
                                    placeholder="Try something like: 'A futuristic city at sunset, filled with flying cars and neon lights, in a cyberpunk style.'"
                                    // value={input}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="relative inline-flex min-h-[101px] resize-none appearance-none items-start justify-start gap-4 border-none bg-transparent p-6 pr-12 font-inter text-base font-normal leading-normal placeholder-[#aeaeae]"
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        disabled={!prompt || isProcessing}
                        onClick={processCreateAudioMusic} className={`rounded-[999px] mt-auto w-full ml-auto block bg-[linear-gradient(130deg,#8EC9FF_9%,#FF306E_56%,#F1D789_95%)] p-[3px] ${!prompt || isProcessing && 'opacity-50'}`}>
                        <div className={`w-full rounded-full py-1 flex justify-center items-center bg-[#1B1B1B] text-white`}>
                            {isProcessing ? "Creating..." : "Create"}
                        </div>
                    </button>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 justify-self-center'>
                        {audio.map((item: string, index: number) => {
                            return <audio key={index} controls >
                                <source src={item} type="audio/mpeg" />
                            </audio>
                        })}
                    </div>
                    
                    
                </div>
            </section>
            
        </div>
    )
}

export default SongMakerApp