import PWCBannerTemplate from "./templates/pwcBannerTemplate/pwcBannerTemplate";
import PWCButtonTemplate from "./templates/pwcButtonTemplate/pwcButtonTemplate";
import PWCPostTemplate from "./templates/pwcPostTemplate/pwcPostTemplate";
class ProactiveWebCampaignPlugin {
    name: string = 'ProactiveWebCampaingPlugin';
    config: any = {};
    hostInstance: any;
    enablePWC: boolean = false;
    campInfo: any;

    constructor(config: any) {
        config = config || {};
        this.config = { ...this.config, ...config };
    }

    onHostCreate() {
        let me: any = this;
        me.hostInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
    }

    onInit() {
        const me: any = this;
        me.installPWCTemplates();
        me.hostInstance.on('onWSOpen', (event: any) => {
            me.sendPWCStartEvent();
        });
        if (!window.localStorage.getItem('kr-pwc')) {
            window.localStorage.setItem('kr-pwc', 'initilized');
        }
        me.hostInstance.bot.on('message', (event: any) => {
            if (event && event.data) {
                const data = JSON.parse(event.data);
                if (data.type == 'pwe_message' && data.event_name == 'pwe_verify') {
                    if (data.body.isEnabled) {
                        this.enablePWC = true;
                        this.campInfo = data.body.campInfo || [];
                        me.eventLoop();
                    }
                }
                if (data.type == 'pwe_message' && data.action?.type && data.action?.type !== 'chat' && this.enablePWC) {
                    const htmlEle = me.hostInstance.generateMessageDOM(data);
                    if (me.hostInstance.config.pwcConfig.container instanceof HTMLElement) {
                        me.hostInstanceconfig.pwcConfig.container.appendChild(htmlEle);
                    } else {
                        document.querySelector(me.hostInstance.config.pwcConfig.container).appendChild(htmlEle);
                    }
                }
                if (data.type == 'pwe_message' && data.action?.type && data.action?.type == 'chat' && this.enablePWC) {
                    me.hostInstance.emit('onPWCUpdate', {
                        data: {
                            enable: true,
                            data: {
                                buttons: [{ title: 'hi' }, { title: 'hello' }],
                                messages: [{ text: 'kore' }, { text: 'kora' }]
                            }
                            // data:  data.action.data
                        }
                    })
                }
            }
        });
    }

    sendPWCStartEvent() {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_verify';
        messageToBot.resourceid = '/pwe_message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        setTimeout(() => {
            me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
                console.error('pwe_startEvent send failed sending');
            });
        }, 200);
    };

    installPWCTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new PWCButtonTemplate());
        templateManager.installTemplate(new PWCBannerTemplate());
        templateManager.installTemplate(new PWCPostTemplate());
    }

    eventLoop() {
        const me: any = this;
        let currentUrl = window.location.href;
        if (!window.localStorage.getItem('kr-pwc')) {
            window.localStorage.setItem('prevUrl', currentUrl);
            me.sendEvent(currentUrl);
        }
        setTimeout(() => {
            currentUrl = window.location.href;
            const prevUrl = window.localStorage.getItem('prevUrl');
            if (prevUrl !== currentUrl) {
                me.sendEvent(currentUrl);
                window.localStorage.setItem('prevUrl', currentUrl);
            }
        });

        window.addEventListener('hashchange', (event: any) => {
            if (event.oldURL !== event.newURL) {
                me.sendEvent(event.newURL);
            }
        });
    }

    sendEvent(currentUrl: any) {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_event';
        messageToBot.resourceid = '/pwe_message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        this.campInfo.forEach((camp: any) => {
            let urlChecked: boolean = false;
            let ruleData: any = [];
            let sendEvent: boolean = true;
            messageToBot.campInfo = {};
            messageToBot.campInfo.campaignId = camp.campId;
            camp.engagementStrategy.url.forEach((urlItem: any) => {
                if (urlItem.matchingCondition == 'is') {
                    if (currentUrl == urlItem.value) {
                        urlChecked = true;
                    }
                } else {
                    if (currentUrl.includes(urlItem.value)) {
                        urlChecked = true;
                    }
                }
            });
            if (urlChecked) {
                let condition = camp.engagementStrategy.rules[0].operator;
                if (condition == 'or') {
                    camp.engagementStrategy.rules.forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'user':
                                ruleItem.value = 'known';
                                ruleData.push(ruleItem);
                                break;
                            case 'timeSpent':
                                ruleItem.value = new Date();
                                ruleData.push(ruleItem);
                                break;
                            case 'pageVisitCount':
                                ruleItem.value = currentUrl;
                                ruleData.push(ruleItem);
                                break;
                            case 'country':
                                break;
                            default:
                        }
                    });
                } else {
                    if (camp.engagementStrategy.rules.filter((r: any) => r.rule).includes('user')) {
                        const userRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'user');
                        if (userRule.value) {
                            userRule.value = 'known';
                            ruleData.push(userRule);
                        } else {
                            sendEvent = false;
                        }
                    }
                    camp.engagementStrategy.rules.forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'timeSpent':
                                ruleItem.value = new Date();
                                ruleData.push(ruleItem);
                                break;
                            case 'pageVisitCount':
                                ruleItem.value = currentUrl;
                                ruleData.push(ruleItem);
                                break;
                            case 'country':
                                break;
                            default:
                        }
                    });
                }
                messageToBot.ruleInfo = ruleData;
                if (sendEvent) {
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                }
            }
        });
    }
}

export default ProactiveWebCampaignPlugin