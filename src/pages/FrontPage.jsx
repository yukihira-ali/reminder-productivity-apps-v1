import { Button, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style.css';

function FrontPage() {
    const navigate = useNavigate();

    const handleAuthPage = () => {
        navigate("/login");
    };

    return (
        <div>
            <Navbar className="p-3" style={{ backgroundImage: "linear-gradient(to right, #fcbc77, #f5dbbf)" }}>
                <i className="bi bi-pencil" style={{ fontStyle: "arial", fontSize: 40, color: "black", fontWeight: "bold" }}> Friendly Reminder</i>
                <Navbar.Collapse className="justify-content-end">
                    <Button className="rounded-pill hover-icon" variant="outline-dark" style={{ backgroundColor: "#e0af79" }} onClick={handleAuthPage}>Sign In</Button>
                </Navbar.Collapse>
            </Navbar>
            <div className="container" style={{ padding: "30px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className='row' style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div className="col" style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                        {`"Fail to plan, plan to fail"`}
                    </div>
                    <div className='vertical-line' style={{ height: '50px', width: '0.5px', backgroundColor: "#e0af79", margin: '0 20px', transform: 'scaleX(0.2)' }}></div>
                    <div className="col" style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                        {`"Forgotful? Make a reminder"`}
                    </div>
                    <div className='vertical-line' style={{ height: '50px', width: '0.5px', backgroundColor: "#e0af79", margin: '0 20px', transform: 'scaleX(0.2)' }}></div>
                    <div className="col" style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                        {`"Simplified your thoughts, make life simpler"`}
                    </div>
                </div>
            </div>
            <hr style={{ border: '1px solid black', margin: '20px 0' }} />
            <div style={{ padding: "20px", textAlign: 'center', fontFamily: 'Roboto', fontSize: '40px', color: '#333333', overflow: 'hidden', width: '100%' }}>
                <h2 style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'moveRight 5s linear infinite' }}>
                    Features
                </h2>
            </div>

            <hr style={{ border: '1px solid black', margin: '20px 0' }} />

            <div id="imageCarousel" className='carousel slide'>

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>

                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <img src='/images/no reminder.png' className='d-block w-100' alt='no reminders' />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Profile page</h5>
                            <p>Create reminders, Add photos, and check weather</p>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/create a reminder.png' className='d-block w-100' alt='create a reminder' />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Create a reminder page</h5>
                            <p>Write down anything you want to remember</p>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/show in profile page.png' className='d-block w-100' alt='show in profile' />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Updated Reminder</h5>
                            <p>User can change status, edit content and delete reminder</p>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/check weather.png' className='d-block w-100' alt='check weather' />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Side Features</h5>
                            <p>Check current weather any place in this world with a single click</p>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/gallery.png' className='d-block w-100' alt='gallery' />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Gallery Section</h5>
                            <p>Add photo, view and delete</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div >
    )
}

export default FrontPage