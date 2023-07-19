

import './welcomeScreenContainer.scss';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import IconsManager from '../iconsManager';

export function WelcomeScreenContainer(props: any) {
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const wsLayout: any = {
        "regular": 'welcome-header',
        "medium": 'welcome-header variation-1',
        "large": 'welcome-header variation-2'
    };
    const startButtonsLayout: any = {
        "slack": "quick-start-buttons-container",
        "stack": "quick-start-buttons-container stacked-buttons"
    }

    const handleStartEvent = (e: any) => {
        hostInstance.sendMessageToBot(e);
        handleEventsWelcomeScreen();
    }

    const handleEventsWelcomeScreen = () => {
        hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container')?.classList.add('fadeIn');
        hostInstance.chatEle.querySelector('.welcome-chat-section')?.classList.remove('minimize');
    }
    
    useEffect(() => {
        hostInstance.eventManager.removeEventListener('.start-conv-button', 'click');
        hostInstance.eventManager.addEventListener('.start-conv-button', 'click', (event: any) => {
            handleEventsWelcomeScreen();
        })

        hostInstance.eventManager.removeEventListener('.search-send', 'click');
        hostInstance.eventManager.addEventListener('.search-send', 'click', (event: any) => {
            const inputEle: any = document.querySelector('.start-conv-input');
            if (inputEle.value.trim() === '') {
                return;
            }
            handleEventsWelcomeScreen();
            hostInstance.sendMessageToBot(inputEle.value);
            inputEle.value = '';
        })

        hostInstance.eventManager.removeEventListener('.start-conv-input', 'keydown');
        hostInstance.eventManager.addEventListener('.start-conv-input', 'keydown', (event: any) => {
            if (event.keyCode == 13) {
                if (event.target.value.trim() === '') {
                    return;
                }
                if (event.shiftKey) {
                    return;
                }
                handleEventsWelcomeScreen();
                event.preventDefault();
                hostInstance.sendMessageToBot(event.target.value);
                event.target.value = '';
            }
        })
    }, []);
    
    return (
        <div className="welcome-chat-section" aria-label="welcome message screen">
            <header className={wsLayout[brandingInfo.welcome_screen.layout]} aria-label="welcome header">
                <div className="welcome-header-bg">
                    <div className="logo-img">
                        <figure>
                            <img src={iconHelper.getIcon('sc_small')} alt="log-img" />
                        </figure>
                    </div>
                    <h1>{brandingInfo.welcome_screen.title.name}</h1>
                    <h2>{brandingInfo.welcome_screen.sub_title.name}</h2>
                    <p>{brandingInfo.welcome_screen.note.name}</p>
                </div>
                <div className="bg-logo">
                    <figure>
                        <img src={iconHelper.getIcon('sc_small')} alt="log-img" />
                    </figure>
                </div>
            </header>
            <div className="welcome-interactions" aria-label="welcome message screen">
                { brandingInfo.welcome_screen.starter_box.show && <section className="start-conversations-wrapper">
                    <div className="start-conv-sec">
                        <div className="conv-starter-box">
                            {brandingInfo.welcome_screen.starter_box.icon.show && <div className="bot_icon">
                                <i className="sdkv3-bot-settings"></i>
                            </div>}
                            <div className="conv-starter-content-info">
                                <div className="conv-starter-title">{brandingInfo.welcome_screen.starter_box.title}</div>
                                <div className="conv-starter-desc">{brandingInfo.welcome_screen.starter_box.sub_text}</div>
                            </div>
                        </div>
                        <div className={startButtonsLayout[brandingInfo.welcome_screen.starter_box.quick_start_buttons.style]}>
                            {
                                brandingInfo.welcome_screen.starter_box.quick_start_buttons.buttons.map((ele: any) => (
                                    <button className="quick-start-btn" onClick={() => handleStartEvent(ele.title)}>
                                        {/* <span className="emoji-symbol">&#128512;</span> */}
                                        <span>{ele.title}</span>
                                        {/* <img className="new-item" src="https://hbchat.senseforth.com/HDFC_Chat/assets/new.png" /> */}
                                    </button>
                                ))
                            }
                        </div>
                        {brandingInfo.welcome_screen.starter_box.quick_start_buttons.show && brandingInfo.welcome_screen.starter_box.quick_start_buttons.input === 'button' && <button className="start-conv-button">
                            <span>Start New Conversation</span>
                            <i className="sdkv3-cheveron-right"></i>
                        </button>}

                        {brandingInfo.welcome_screen.starter_box.quick_start_buttons.show && brandingInfo.welcome_screen.starter_box.quick_start_buttons.input === 'search' && <div className="start-conv-search-block">
                            <div className="start-conv-search">
                                <i className="sdkv3-search search-icon"></i>
                                <input className="start-conv-input" type="text" placeholder="Search"></input>
                            </div>
                            <button className="search-send" aria-label="send button">
                                <i className="sdkv3-send"></i>
                            </button>
                        </div>}
                    </div>
                </section> }
                { brandingInfo.welcome_screen.starter_box.show && <article className="pramotional-banner-wrapper-container">
                    <a href="#" target="_blank" className="banner-img" aria-label="Hdfc pramotional banner">
                        <figure>
                            <img src={iconHelper.getIcon('banner')} alt="log-img" />
                        </figure>
                    </a>
                    <a href="#" target="_blank" className="banner-img" aria-label="Hdfc pramotional banner">
                        <figure>
                            <img src={iconHelper.getIcon('banner')} alt="log-img" />
                        </figure>
                    </a>
                </article> }
            </div>        
            <footer>
                <div className="powerdby-info">
                    <p>Powered by</p>
                    <figure>
                        <img src={iconHelper.getIcon('kore_logo')} alt="kore-img" />
                    </figure>
                </div>
            </footer>
        </div>
    );

}