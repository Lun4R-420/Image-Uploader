import { useDropzone } from "react-dropzone";
import { useState } from "react";
import "./Upload.css";
import Exit from "../../assets/exit.svg";
import Download from "../../assets/download.svg";
import Link from "../../assets/link.svg";

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
    const onDrop = async (acceptedFiles: File[]) => {
        const image = acceptedFiles[0];

        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setImage(data);
        console.log(data); 
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
        link.href = `http://localhost:3000/upload/download/${image.filename}`;
        link.download = image.filename;
        link.click();
    };

    return (
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
    );
}

export default Upload;