import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const LOCALHOST = 'http://localhost:1337';
const URL = 'http://localhost:1337/api/main-page';

function App() {
    const [headersData, setHeadersData] = useState([]);
    const [logos, setLogos] = useState([]);
    const [mail, setMail] = useState('');
    const [logoCompany, setLogoCompany] = useState('');
    const [aboutUs, setAboutUs] = useState([]);
    const [workingWithUs, setWorkingWithUs] = useState([]);
    const [frontendLogos, setFrontendLogos] = useState([]);
    const [backendLogos, setBackendLogos] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPicture, setTeamPicture] = useState([]);
    const [review, setReview] = useState([]);

    const getLogo = (arrayOfLogos) => {
        const logoURL = arrayOfLogos.map((partner, id) => {
            const logoURL = partner.attributes.url;
            console.log(logoURL, 'logourl')
            return {id: partner.id, logoURL};
        });
        setLogos(logoURL);
    }


    // const getContact = (arrayOfContacts) => {
    //     const logoURL = arrayOfContacts.map((partner, id) => {
    //         const logoURL = partner.attributes.url;
    //         console.log(logoURL, 'logourl')
    //         return {id: partner.id, logoURL};
    //     });
    //     setLogos(logoURL);
    // }

    const fetchData = async () => {
        try {
            const response = await axios.get(URL, {
                params: {
                    populate: ["partner.logo", 'contact.logo', 'abouts', 'workingwithuses.icon', 'frontend.logo', 'backends.logo', 'teams.photo', 'teamPictures.photo', 'reviews.photo']
                }
            });
            const {data} = response.data;
            const {attributes} = data;
            const {
                partner,
                contact,
                abouts,
                workingwithuses,
                frontend,
                backends,
                teams,
                teamPictures,
                reviews
            } = attributes;

            //
            console.log(reviews.data, 'reviews')

            setHeadersData(attributes)

            const {logo} = partner.data.attributes;
            const {mail} = contact.data.attributes;
            const frontendLogosArray = frontend.data.attributes.logo.data

            console.log(frontendLogosArray, 'frontendLogosArray')
            const {url: urlLogoCompany} = contact.data.attributes.logo.data.attributes;

            getLogo(logo.data)
            setMail(mail)
            setLogoCompany(urlLogoCompany)
            setAboutUs(abouts.data)
            setWorkingWithUs(workingwithuses.data)
            setFrontendLogos(frontendLogosArray)
            console.log(backends.data, 'see')
            setBackendLogos(backends.data)

            setTeams(teams.data)
            setTeamPicture(teamPictures.data)
            setReview(reviews.data)
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="App">
            <a href='mailto'>{mail}</a>
            <img src={LOCALHOST + logoCompany} alt="logo" />
            <div>
                <h1>{headersData.title}</h1>
                <p>{headersData.subtitle}</p>
            </div>
            <section className="clients">
                <h2>Наши клиенты</h2>
                {logos.map(image => (
                    <img key={image.id} src={LOCALHOST + image.logoURL} alt="logo" />
                ))}
            </section>
            <section className='about'>
                <h2>КТО МЫ?</h2>
                {aboutUs.map(item => (
                    <div key={item.id}>
                        <div>{item.attributes.number}</div>
                        <span>{item.attributes.description}</span>
                    </div>
                ))}
            </section>
            <section className='workingWithUs'>
                <h2>Работа с нами это</h2>
                <ul className="features-list">
                    {workingWithUs.map(item => (
                        <li key={item.id} className='features-item'>
                            <img src={LOCALHOST + item.attributes.icon.data.attributes.url} alt="logo" />
                            <h3>{item.attributes.title}</h3>
                            <p>{item.attributes.subtitle}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section className='technologies'>
                <div>
                    <h2>Что используем в работе</h2>
                    <ul className="technologies-list">
                        <li className='technologies-item'>
                            <h3 className='technologies-item-title'>Front-end</h3>
                            <ul className='technologies-inner-list'>
                                {frontendLogos.map(logo => (
                                    <li key={logo.id} className='technologies-inner-item'>
                                        <img
                                            className='technologies-logo'
                                            src={LOCALHOST + logo.attributes.url} alt="logo"
                                        />

                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className='technologies-item'>
                            <h3 className='technologies-item-title'>Back-end</h3>
                            <ul className='technologies-inner-list'>
                                {backendLogos.map(logo => (
                                    <li key={logo.id} className='technologies-inner-item'>
                                        <h4>{logo.attributes.languageProg}</h4>
                                        {logo.attributes.logo.data.map((item, index) => (
                                            <img
                                                key={index}
                                                className='technologies-logo'
                                                src={LOCALHOST + item.attributes.url}
                                                alt="logo"
                                            />
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='team'>
                <h2>Кто реализует проекты</h2>
                <div className='teamSlider'>
                    <div className='teamCard'>
                        {teams.map((item, index) => (
                            <picture key={index}>
                                <source
                                    type="image/webp"
                                    data-srcset={LOCALHOST + item.attributes.photo.data.attributes.url}
                                />
                                <img
                                    className='teamCard-image'
                                    src={LOCALHOST + item.attributes.photo.data.attributes.url}
                                    title={item.attributes.name} alt={item.attributes.name}
                                />
                                <div>{item.attributes.name}</div>
                                <div>{item.attributes.position}</div>
                                <div>{item.attributes?.experience}</div>
                                <div>{item.attributes?.stack}</div>
                                <div>{item.attributes?.description}</div>
                            </picture>
                        ))}
                    </div>
                </div>
                <div className='teamCarousel'></div>

                <div className="team-grid-container">
                    <div className="team-grid">
                        <div>
                            <h3 className="team-grid-headline">Frontend</h3>
                            <div className='team-grid-images-block'>
                                {teamPicture.map(item => (
                                    <div key={item.id} className='team-grid-image-wrapper'>
                                        {item.attributes.photo.data.map(photoPath => (
                                            <div key={photoPath.id}>
                                                <img
                                                    className='team-grid-image'
                                                    src={LOCALHOST + photoPath.attributes.url}
                                                    alt='photo'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='reviews'>
                <h2>Отзывы о нас</h2>
                {/*<div className="reviewsCarousel">*/}
                {/*    <div className="reviews-card-container">*/}
                {/*        <div className="reviews-main-card">*/}
                {/*            <div className="reviews-main-top">*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="reviews-main-card">
                    {review.map(item => (
                        <div key={item.id}>
                            <img src={LOCALHOST + item.attributes.photo.data.attributes.url}></img>
                            <div>{item.attributes.name}</div>
                            <div>{item.attributes.positionAndNameCompany}</div>
                            <div>{item.attributes.textReview}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
