import { useRef, useState, useEffect } from "react";
import { usePublishStore } from "@/store/use-publish-app-store";
import { usePopupStore } from "@/store/use-popup-store";
import defaultLogo from "@/images/publish/default-logo.png";
import Image from "next/image";
import { publishDapps } from "@/services/dapp";
import { triggerToast } from "@/utils/trigger-toast";

export default function PublishPopup() {
  const { title, description, categories, imgUrl, setField, reset, id } =
    usePublishStore();
  const { close } = usePopupStore();
  const [titleCount, setTitleCount] = useState(0);
  const [descCount, setDescCount] = useState(0);
  const [categoryInput, setCategoryInput] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    categories: "",
    image: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Validation states
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      categories: "",
      image: "",
    };

    // Title validation
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    // Categories validation
    if (categories.length === 0) {
      newErrors.categories = "At least one category is required";
    }

    // Image validation
    if (!imgUrl) {
      newErrors.image = "Cover image is required";
    }

    setErrors(newErrors);

    // Check if all validations pass
    const isFormValid = Object.values(newErrors).every((error) => !error);
    setIsValid(isFormValid);

    return isFormValid;
  };

  // Validate on any field change
  useEffect(() => {
    validateForm();
  }, [title, description, categories, imgUrl]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "File size should not exceed 2MB",
      }));
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please upload PNG, JPG, JPEG, or GIF files only",
      }));
      return;
    }

    const url = URL.createObjectURL(file);
    setField("imgUrl", url);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handlePublishApp();
  };

  // Prevent form submission on enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  const handlePublishApp = async () => {
    try {
      await publishDapps(id, {
        title,
        description,
        categories: [0, 1],
        logo: "logo",
        cover: "cover",
      });

      triggerToast("update", "App in review!");

      setField("isPublished", true);
    } catch (e) {
      console.log(e);
      triggerToast("error", "Failed to publish app");
    }
    reset();
    close();
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Publish my AI App {id}</h2>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-10"
        onKeyDown={handleKeyDown}
      >
        {/* Image Upload */}
        <div className="flex items-center justify-start gap-5 md:flex-row flex-col">
          <div className="flex items-center justify-center w-[120px] h-[120px] rounded-full shrink-0">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="Cover"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Image src={defaultLogo} alt="Cover" />
            )}
          </div>

          <div className="flex-col flex md:items-start items-center">
            <p className="md:text-left text-center text-[16px] leading-6 font-semibold text-primary-black tracking-[-0.16px] mb-2">
              Upload Cover
            </p>
            <p className="md:text-left text-center text-[14px] leading-5 text-[#666] tracking-[-0.21px] max-w-[344px] mb-5">
              Image size should not exceed 2MB, supported file types: .png,
              .jpg, .jpeg, .gif
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept=".png,.jpg,.jpeg,.gif"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[14px] leading-5 font-semibold tracking-[-0.14px] md:mx-0 px-4 py-2 text-primary-black bg-white border border-[#D8D8D8] rounded-full hover:bg-gray-50"
            >
              Upload Image
            </button>
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <label className="text-[#666] text-[14px] leading-5 font-medium tracking-[-0.14px]">
              Title
            </label>
            <span className="text-xs text-gray-500">{titleCount}/100</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 100) {
                setField("title", value);
                setTitleCount(value.length);
              }
            }}
            placeholder="Please enter no more than 100 words"
            className="w-full p-3 bg-[#F5F5F7] rounded-xl text-[14px] leading-5 tracking-[-0.21px] text-[#1B1B1B] placeholder-[#AEAEAE] focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <label className="text-[#666] text-[14px] leading-5 font-medium tracking-[-0.14px]">
              Description
            </label>
            <span className="text-xs text-gray-500">{descCount}/100</span>
          </div>
          <textarea
            value={description}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 100) {
                setField("description", value);
                setDescCount(value.length);
              }
            }}
            placeholder="Please enter no more than 100 words"
            rows={4}
            className="w-full p-3 bg-[#F5F5F7] rounded-xl h-[88px] text-[14px] leading-5 tracking-[-0.21px] text-[#1B1B1B] placeholder-[#AEAEAE] focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Categories */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <label className="text-[#666] text-[14px] leading-5 font-medium tracking-[-0.14px]">
              Categories
            </label>
            <span className="text-xs text-gray-500">{categories.length}/7</span>
          </div>
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => {
              const value = e.target.value;
              setCategoryInput(value);

              const newCategories = value
                .split(",")
                .map((cat) => cat.trim())
                .filter(Boolean);

              if (newCategories.length <= 7) {
                setField("categories", newCategories);
              }
            }}
            placeholder="Enter categories separated by commas"
            className="w-full p-3 bg-[#F5F5F7] rounded-xl text-[14px] leading-5 tracking-[-0.21px] text-[#1B1B1B] placeholder-[#AEAEAE] focus:outline-none"
          />
          {errors.categories && (
            <p className="text-red-500 text-xs mt-1">{errors.categories}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex items-center justify-end mt-10">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-3 text-white rounded-full text-[16px] leading-6 tracking-[-0.16px] transition-colors duration-200 ease-in-out
              ${
                isValid
                  ? "bg-[#1B1B1B] hover:bg-[#000000]"
                  : "bg-[#D8D8D8] cursor-not-allowed"
              }`}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
