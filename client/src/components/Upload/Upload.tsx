import { useDropzone } from "react-dropzone";
import { useState } from "react";
import "./Upload.css";
import Exit from "../../assets/exit.svg";
import Download from "../../assets/download.svg";
import Link from "../../assets/Link.svg";

interface UploadedImage {
    id: number;
    filename: string;
    url: string;
    uploadedAt: string;
}

interface UploadProps {
    isDarkMode: boolean;
};

function Upload({ isDarkMode }: UploadProps) {
    const [image, setImage] = useState<UploadedImage | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("image-uploader-backend.vercel.app/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            console.log("UPLOAD RESPONSE:", data);
            console.log("IMAGE URL:", data.url);

            setImage(data);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleShare = async () => {
        if (!image) return;

        await navigator.clipboard.writeText(image.url);
        alert("Image URL copied to clipboard!");
    };

    const handleDownload = () => {
        if (!image) return;

        const link = document.createElement("a");
        link.href = image.url;
        link.download = image.filename;
        link.target = "_blank";
        link.click();
    };

    return (
        <div>
            {isUploading ? (
                <div className={isDarkMode ? "upload-container dark" : "upload-container"}>
                    <p className={isDarkMode ? "par dark" : "par"}><b>Uploading</b>, please wait..</p>
                    <div className={isDarkMode ? "loading-line dark" : "loading-line"}>
                        <div className="loading-line-progress"></div>
                    </div>
                </div>
            ) : (
                <div>
                {image ? (
                    <>
                        <div className={isDarkMode ? "upload-container dark" : "upload-container"}>
                            <img src={image.url} alt="uploaded" className="uploaded-image" />
                        </div>
                        <div className="buttons">
                            <button onClick={handleShare} className="button">
                                <img src={Link} alt="Share" className="icon" />
                                <p>Share</p>
                            </button>
                            <button onClick={handleDownload} className="button">
                                <img src={Download} alt="Download" className="icon" />
                                <p>Download</p>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={isDarkMode ? "upload-container dark" : "upload-container"}>
                        <div {...getRootProps()} className={isDarkMode ? "dropzone dark" : "dropzone"}>
                            <input {...getInputProps()} />

                            <img src={Exit} alt="Exit" className="exit-icon" />
                            <h3>Drag & drop a file or browse files</h3>
                            <p>JPG, PNG or GIF - Max file size 2MB</p>
                        </div>
                    </div>
                )}
                </div>
            )}
        </div>
    );
}

export default Upload;