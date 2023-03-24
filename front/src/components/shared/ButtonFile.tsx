import { useState } from "react";
import { FileButton } from "@mantine/core";

const ButtonFile = () => {
    const [file, setFiles] = useState<File | null>(null);

    // return (
    //     // <div>
    //     //     <FileButton onChange={setFiles} accept="image/png, image/jpeg" multiple/>
    //     //     {(props) => <Button {...props}>Upload</Button>}
    //     // </div>
    // )
}