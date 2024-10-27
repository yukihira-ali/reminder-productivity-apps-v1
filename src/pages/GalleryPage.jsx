import { Button, Col, Container, Modal, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UploadPhoto from "../components/UploadPhoto";
import { useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";

export default function GalleryPage() {
    const [modalShow, setModalShow] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const navigate = useNavigate();

    const handleBacktoProfile = () => {
        navigate("/profile");
    };

    const fetchPhotos = useCallback(async () => {
        if (!currentUser) {
            console.error("User not logged in");
            return;
        }
        const storagePhotoRef = ref(storage, `users/${currentUser.uid}/images/`);

        try {
            const photosList = await listAll(storagePhotoRef);
            const userPhotos = await Promise.all(
                photosList.items.map(async (photoRef) => ({
                    url: await getDownloadURL(photoRef),
                    path: photoRef.fullPath,
                }))
            );
            setPhotos(userPhotos);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    const handleDeletePhoto = async (photoPath) => {
        const photoRef = ref(storage, photoPath);
        try {
            await deleteObject(photoRef);
            console.log("Deleted photo successfully");
            fetchPhotos(); // Refresh photos after deletion
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    const handleClickPhoto = (url) => {
        setSelectedPhoto(url);
        setShowPhotoModal(true);
    };

    return (
        <>
            <Container>
                <Navbar className="d-flex justify-content-between align-items-center">
                    <Button className="bi bi-camera-fill" onClick={() => setModalShow(true)}>Add Photo</Button>
                    <h1 className="text-center flex-grow-1">Reminder Gallery</h1>
                    <Button onClick={handleBacktoProfile}>Back to Profile</Button>
                    <UploadPhoto
                        show={modalShow}
                        handleClose={() => setModalShow(false)}
                        refreshPhotos={fetchPhotos}
                    />
                </Navbar>
                <hr />
                <Container>
                    <Row>
                        {photos.map((photo, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Row>
                                    <img
                                        src={photo.url}
                                        alt={`Uploaded photo ${index}`}
                                        className="img-fluid"
                                        onClick={() => handleClickPhoto(photo.url)}
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            borderBlockColor: 'grey',
                                            borderBlockStyle: 'solid',
                                            cursor: 'pointer',
                                        }}
                                    />
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeletePhoto(photo.path)}
                                    >
                                        <i className="bi bi-trash-fill" />
                                    </Button>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
            <Modal show={showPhotoModal} onHide={() => setShowPhotoModal(false)} centered>
                <Modal.Body className="text-center">
                    <img src={selectedPhoto} alt="Selected" className="img-fluid" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPhotoModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
