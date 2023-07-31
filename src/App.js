import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const LOCALHOST = 'http://localhost:1337';
const URL = 'http://localhost:1337/api/main-page';

function App() {
    const [headersData, setHeadersData] = useState([]);
    const [logos, setLogos] = useState([]);
    const [mail, setMail] = useState('');
    const [logoCompany, setLogoCompany] = useState('')
    const [aboutUs, setAboutUs] = useState([])
    const [workingWithUs, setWorkingWithUs] = useState([])
    const [frontendLogos, setFrontendLogos] = useState([])
    const [backendLogos, setBackendLogos] = useState([])

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
                    populate: ["partner.logo", 'contact.logo', 'abouts', 'workingwithuses.icon', 'frontend.logo', 'backends.logo']
                }
            });
            const {data} = response.data;
            const {attributes} = data;
            const {partner, contact, abouts, workingwithuses, frontend, backends} = attributes;
            console.log(backends, 'backendbackendbackendbackendbackend')

            setHeadersData(attributes)

            const {logo} = partner.data.attributes;
            const {mail} = contact.data.attributes;
            const frontendLogosArray = frontend.data.attributes.logo.data

            console.log(frontendLogosArray, 'frontendLogosArray')
            const {url: urlLogoCompany} = contact.data.attributes.logo.data.attributes;
            // const {url: urlLogoFrontend} = frontendArray.data.attributes.logo.data.attributes;
            getLogo(logo.data)
            setMail(mail)
            setLogoCompany(urlLogoCompany)
            setAboutUs(abouts.data)
            setWorkingWithUs(workingwithuses.data)
            setFrontendLogos(frontendLogosArray)
            console.log(backends.data, 'see')
            setBackendLogos(backends.data)
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
                    <h3>Front-end</h3>
                    <ul className="technologies-list">
                        {frontendLogos.map(logo => (
                            <li key={logo.id} className=''>
                                <img
                                    className='technologies-logo'
                                    src={LOCALHOST + logo.attributes.url} alt="logo"
                                />

                            </li>
                        ))}
                        {backendLogos.map(logo => (
                            <li key={logo.id} className=''>
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
                </div>
            </section>
        </div>
    );
}

export default App;
