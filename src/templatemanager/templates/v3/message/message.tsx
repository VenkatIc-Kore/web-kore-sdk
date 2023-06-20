import { h, Fragment } from 'preact';
import KoreHelpers from '../../../../utils/helpers';
export function Message(props: any) {
    let msgData = props.msgData;
    const helpers = KoreHelpers.helpers;
    // if (msgData.message) {
    return (
        <Fragment>
            {/* {msgData.message[0].cInfo.body} */}
            {/* {msgData.message.forEach((msgItem: any, key: any) => { */}
                { msgData.type !== 'bot_response' ? (
                    <div className="agent-bubble-comp" id={msgData.messageId}>
                        <div className="agent-bubble-content">
                            <div className="top-info">
                                <div className="time-tamp"><time>{helpers.formatDate(msgData.createdOn)}</time></div>
                                <div className="you-text">You</div>
                            </div>
                            <div className="bubble-msg-with-img">
                                {/* <div className="bubble-msg">{msgData.message[0].cInfo.body}</div> */}
                                <div className="bubble-msg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</div>
                                <div className="agent-img">
                                    <figure>
                                        <img src="/images/avatar-bot.svg" alt='avatr img' />
                                    </figure>
                                </div>
                                <div className="copy-bubble">
                                    <img src="/images/arrow-back.svg" alt="back button" />
                                </div>
                            </div>
                            {/* <div className="bottom-info">
                                <div className="time-tamp"><time>2:32pm, Today</time></div>
                                <div className="read-text">Read <i className="sdkv3-read-status"></i></div>
                            </div> */}
                        </div>
                    </div>) : (
                    <div className="bot-bubble-comp" id={msgData.messageId}>
                        <div className="bot-bubble-content">
                            <div className="top-info">
                                <div className="you-text">Kore.ai Bot</div>
                                <div className="time-tamp"><time>{helpers.formatDate(msgData.createdOn)}</time></div>
                            </div>
                            <div className="bubble-msg-with-img">
                                {/* <div className="bubble-msg">{msgData.message[0].cInfo.body}</div> */}
                                <div className="bubble-msg">A lightweight and extensible directive for fancy popover creation. Selector: '[ngbPopover]'. Exported as: 'ngbPopover'. Inputs</div>
                                <div className="bot-img">
                                    <figure>
                                        <img src="/images/avatar-bot.svg" alt='avatr img' />
                                    </figure>
                                </div>
                                <div className="copy-bubble">
                                    <img src="/images/arrow-back.svg" alt="back button" />
                                </div>
                            </div>
                            {/* <div className="bottom-info">
                                <div className="time-tamp"><time>2:32pm, Today</time></div>
                            </div> */}
                        </div>
                    </div>) }
            {/* })} */}
        </Fragment>
    )
    // }
}