import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.scss";
import Button from "./Button";

const ImageUpload: React.FC<ImageUploadInterface> = ({
  id,
  center,
  onInput,
  errorText = ""
}) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as any);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  const pickedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    let pickedFile = null;
    let fileIsValid = isValid;
    if (files && files.length === 1) {
      pickedFile = files[0];
      setFile(pickedFile);
      fileIsValid = true;
      setIsValid(true);
    } else {
      fileIsValid = false;
      setIsValid(false);
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;

interface ImageUploadInterface {
  id: string;
  center?: boolean;
  onInput(id: string, pickedFile: any, isValid: boolean): void;
  errorText?: string;
}
