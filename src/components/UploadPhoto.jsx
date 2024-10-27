import { getAuth } from "firebase/auth";
import { useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { Button, Modal } from "react-bootstrap";

export default function UploadPhoto({ show, handleClose, refreshPhotos }) {
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleSelectPhoto = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleUpload = async () => {

        setUploading(true);  // Set uploading to true before the checks

        // Ensure there is a photo and the user is logged in
        if (!photo || !currentUser) {
            setUploading(false); // Reset uploading if conditions are not met
            alert("Please login!"); // Provide user feedback
            return;
        }

        const uniquePhotoName = `${Date.now()}_${photo.name}`;
        const storagePath = ref(storage, `users/${currentUser.uid}/images/${uniquePhotoName}`);

        try {
            const uploadImage = await uploadBytes(storagePath, photo);
            const photoURL = await getDownloadURL(uploadImage.ref);
            console.log("Photo uploaded successfully:", photoURL);
            refreshPhotos();
            handleClose();
            setPhoto(null);

        } catch (error) {
            console.error("Upload Failed!:", error);
            alert("Upload failed. Please try again."); // Inform the user of the failure
        } finally {
            setUploading(false); // Ensure uploading is reset after the upload attempt
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Memories Live Here!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Save Memory</h2>
                <input type="file" onChange={handleSelectPhoto} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
