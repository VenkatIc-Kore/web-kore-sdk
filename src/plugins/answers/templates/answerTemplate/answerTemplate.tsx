import BaseChatTemplate from '../../../../templatemanager/templates/baseChatTemplate';
import MemoizedSearchResultsComponent from './searchResults';
import './answerTemplate.scss';
import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export function Answers(props: any) {
    const hostInstance = props.hostInstance;
    const msgData = props.msgData;
    const messageObj = {
        msgData: msgData,
        hostInstance: hostInstance
    }
    const searchResultsSettings = hostInstance.config['searchResultsSettings'];
    const [answersObj, setAnswersObj]: any = useState({ "generative": { "answerFragments": [], "sources": [] }});
    const [modelType, setModelType] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [imageObj, setImageObj] = useState({url:'',isShow:false});
    const [searchResultObj, setSearchResultObj] = useState({...searchResultsSettings, "data":[],"showResults":false});

    useEffect(() => {
        const results = messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0]?.snippet_content;
        const templateType = messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data[0].snippet_type;
        setModelType(templateType);
        // const  chunkResults  = messageObj?.msgData?.message[0]?.component?.payload?.chunk_result;
        const chunkResults =  {
            "extractive": [
              
            ],
            "generative": [
              {
                "_index": "answer_index",
                "_type": "_doc",
                "_id": "n6ihE5EBbS6PFLEDBZ61",
                "_score": 0.2725873,
                "_ignored": [
                  "chunkContent.normalize",
                  "chunkText.normalize",
                  "chunkText.keyword",
                  "chunkContent.keyword"
                ],
                "_source": {
                  "sourceId": "fs-bf596cb6-4494-5c5d-b87a-29f764d2d279",
                  "recordTitle": "On call Tracker - Responsibilities.pdf",
                  "pageNumber": 2,
                  "docId": "fc-4dd6ad07-5043-51f4-a3fb-66ff0abc9bf5",
                  "recordUrl": "https://sit-xo.kore.ai/api/getMediaStream/findly/f-a9461dab-4502-5ee5-bc92-d6e7c55d5376.pdf?n=311082751&s=IktCUVZDeHM1SjJLeHpOSG9VcGVBOVByVXdlQ2VLNW5oMFA3Z2VsbEIvTHc9Ig$$#page=2",
                  "searchIndexId": "sidx-724ca9a8-c707-512b-9a4c-0ea857bf1595",
                  "sourceAcl": [
                    "*"
                  ],
                  "chunkType": "Text",
                  "chunkId": "chk-6f162561-4124-4829-99b3-a6952938203d",
                  "createdOn": "2024-08-02T14:52:31.438Z",
                  "chunkContent": "chunkText : Deployment Support The on-call engineer should provide support for cloud and Installer deployments,   (WIP) chunkTitle :  sourceName : Default Directory sourceType : file",
                  "sourceUrl": "https://sit-xo.kore.ai/api/getMediaStream/findly/f-a9461dab-4502-5ee5-bc92-d6e7c55d5376.pdf?n=311082751&s=IktCUVZDeHM1SjJLeHpOSG9VcGVBOVByVXdlQ2VLNW5oMFA3Z2VsbEIvTHc9Ig$$",
                  "chunkText": "Deployment Support The on-call engineer should provide support for cloud and Installer deployments, working alongside the story owner to create a deployment document and ensuring a smooth deployment process. They should also work closely with the release manager to create the on-prem step upgrade release document.   Post-Deployment Sign Off After deployment, the on-call engineer should provide an on-call sign-off of the build, confirming its stability and availability of all the services.   Documentation   The on-call engineer is responsible for generating comprehensive documentation regarding all incidents, including details about their root causes and corresponding fixes. They should also maintain a log of the incident history and troubleshooting references to assist future on-call engineers.   Accountability The on-call engineer is accountable for their actions and decisions during their on-call shifts. They should promptly report any mistakes or incidents that occur, ensuring transparency.   (WIP)",
                  "sourceType": "file",
                  "chunkMeta": {
                    
                  },
                  "chunkTitle": "",
                  "extractionMethodType": "token",
                  "extractionMethod": "text",
                  "sourceName": "Default Directory",
                  "extractionStrategy": "Default Strategy",
                  "fileType": "pdf",
                  "chunkQualified": true,
                  "score": 0.2725873,
                  "sentToLLM": true,
                  "usedInAnswer": true,
                  "chunk_id": "chk-6f162561-4124-4829-99b3-a6952938203d"
                },
                "vector_search_score": 0.2725873,
                "keyword_search_score": 1.4658772,
                "positional_score": 0.016666666666666666
              }
            ]
          }
        let searchResultData = chunkResults?.[chunkResults?.generative?.length?'generative':'extractive'] || [];
          // const searchResultData  = messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data.slice(1, 3); 
    //    [{type:'web',desc:"Lake Forest, California 92630 PropStream is The Most Trusted All-in-one Solution That Provides Comprehensive Real Estate Data Nationwide. Links Getting Started Pricing Renew Blog / News Real Estate Investors Blog Real Estate Agents Blog My Account Contact Us Customer Support Partner With Us PropStream Features Instant Comparables Targeted Marketing Owner Contact Information ADU and Rehab Calculators Automated List Marketing Tiered Postcard Pricing Skip Tracing iOS and Android Mobile App Clients Real Estate Investors Real Estate Agents Real Estate Brokers Contractors Property Managers Lenders and Loan Originators Appraisers Resources PropStream Help Mobile App PropStream Academy Real Estate Glossary of Terms Webinars Frequently Asked Questions Our Community Help Videos About PropStream About Us Newsletter Subscription Supporting Fair Housingand Accessibility Brand Assets Careers © Copyright 2024 PropStream.com - All Rights Reserved | Privacy Policy | Terms of Use | Cookie Policy | Don't Sell My Info",title:"Flipping Houses and Taxes: What You Need to Know"},
    //     {type:'xlsx',desc:"To learn more about how PropStream can help you generate more business through targeted lead generation and receive a free trial, stop by booth #24 at Tom Ferry Success Summit or reach out to support@propstream.com.  About PropStream: PropStream leads the real estate data industry with the most robust, detailed datasets available. In business since 2006, PropStream has data for over 155 million properties nationwide and hundreds of filtering combinations to help real estate investors, agents, and brokers find the best off-market leads in the least amount of time. With built-in marketing tools, PropStream has everything motivated real estate professionals need to build marketing lists and make a pitch in one convenient location. PropStream was acquired by Stewart Title Co. in November 2021 and has been named a HousingWire Tech 100 Honoree in 2021, 2022, and 2023. Share    Published by PropStream August 15, 2023 Real Estate Investors 11.4.2022 PropStream How to Follow Fair Housing Guidelines as a Real Estate Professional Real Estate Investors 06.22.2022 PropStream 4 Benefits of Being Both an Investor and Agent PropStream 26457 Rancho Parkway South Lake Forest, California 92630 PropStream is The Most Trusted All-in-one Solution That Provides Comprehensive Real Estate Data Nationwide.",title:"PropStream to Exhibit at Tom Ferry Success Summit 2023!"},
    //     {type:'pdf',desc:"26457 Rancho Parkway South Lake Forest, California 92630 PropStream is The Most Trusted All-in-one Solution That Provides Comprehensive Real Estate Data Nationwide. Links Getting Started Pricing Renew Blog / News Real Estate Investors Blog Real Estate Agents Blog My Account Contact Us Customer Support Partner With Us PropStream Features Instant Comparables Targeted Marketing Owner Contact Information ADU and Rehab Calculators Automated List Marketing Tiered Postcard Pricing Skip Tracing iOS and Android Mobile App Clients Real Estate Investors Real Estate Agents Real Estate Brokers Contractors Property Managers Lenders and Loan Originators Appraisers Resources PropStream Help Mobile App PropStream Academy Real Estate Glossary of Terms Webinars Frequently Asked Questions Our Community Help Videos About PropStream About Us Newsletter Subscription Supporting Fair Housingand Accessibility Brand Assets Careers © Copyright 2024 PropStream.com - All Rights Reserved | Privacy Policy | Terms of Use | Cookie Policy | Don't Sell My Info",title:"How to Set Up Alerts and Automations In List Automator - PropStream Help Video Library"}].forEach((item) => {
    //     let webdata  = JSON.parse(JSON.stringify(messageObj?.msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data));
    //     webdata[0].snippet_content[0].sources[0].source_type = item?.type;
    //     webdata[0].snippet_content[0].sources[0].title = item?.title;
    //     webdata[0].snippet_content[0].answer_fragment = item?.desc;
    //      searchResultData  =searchResultData.concat(webdata); 
    //    })
       searchResultData  = searchResultData.slice(0, searchResultsSettings?.searchResultsCount); 
        setSearchResultObj({...searchResultsSettings, "data":searchResultData, "showResults":false});
        
        setAnswersObj((prevState: any) => ({ ...prevState}));
        updateGenerativePayload(results);
    }, [msgData])

    //generative template payload update
    const updateGenerativePayload = (data: any) => {
        let answer_fragment: Array<Object> = [];
        let sources_data: Array<Object> = [];
        data?.forEach((item: any) => {
            const isExist = sources_data.find((source: any) => source.id === item?.sources[0]?.doc_id);
            if (!isExist) sources_data.push({ "title": item?.sources[0]?.title, "id": item?.sources[0]?.doc_id, "url": item?.sources[0]?.url, "image_url": item?.sources[0]?.image_url, "source_type": item?.sources[0]?.source_type, "page_no": item?.sources[0]?.page_no || 1 });
        });
        data?.forEach((answer: any) => {
            const index = sources_data.findIndex((source: any) => source.id === answer?.sources[0]?.doc_id);
            answer_fragment.push({ "title": answer?.answer_fragment, "id": index });
        });
        setAnswersObj((prevState: any) => ({ ...prevState, "generative": { "answerFragment": answer_fragment, "sources": sources_data } }));
    }

    //redirect to specific url
    const redirectToURL=(url:string)=>{
        window.open(url, '_blank'); 
    }

    const showFileUrl = (event:any ,url:string, show:boolean) => {
        setImageObj({"url": url, isShow:false});
        setTimeout(()=>{
           if(show) setImageObj(preState=>({...preState,isShow:show}));
        },200)
    }


    const showMoreResults = async (event:any,data:any) => {
         if(!data.showResults) {
                setSearchResultObj((preState:any)=>({...preState,showResults:true}));
                if(data?.templateType !=='overlay')event?.currentTarget?.parentElement?.remove();
            }
      };

    const closeOverlayModel = ()=>{
        setSearchResultObj((preState:any)=>({...preState,showResults:false}));
    }


    return (
        <div class="sa-answer-block">
            {
                (modelType === 'generative_model'  || modelType === 'extractive_model') ? (
                    <Fragment>
                        <div class="sa-answer-result-block">
                            <div class="sa-answer-result-sub-block">
                                {
                                    answersObj.generative?.answerFragment?.map((answer: any) =>
                                        <span class="sa-answer-result-heading" onMouseOver={()=>setSelectedIndex(answer?.id + 1)} onMouseOut={()=>setSelectedIndex(0)}>{answer?.title} <span><sup>{answer?.id + 1}</sup></span></span>
                                    )
                                }                                
                            </div>
                            <div className="sa-file-popup-img-container">
                            {<div className={`sa-file-popup-img ${!imageObj?.isShow&&'d-none'} `}>
                                <img id="sa-file-img" src={imageObj.url}/>
                                </div>}
                            </div>
                            <div className="sa-answer-gen-footer">
                                    {
                                        answersObj?.generative?.sources?.map((source: any, index: number) => (
                                            <div class="sa-answer-result-footer" ><span onClick={()=>redirectToURL(source?.url)}>{index + 1}. <span className={`${(selectedIndex===index+1)&&'selected'}`}>{source?.title || source?.url}</span></span>
                                             {source?.image_url&&
                                            <Fragment>
                                                <span className="sa-answer-file-url-block" ><span className="sa-answer-file-url-icon" onMouseOver={($event)=>showFileUrl($event,source?.image_url,true)} onMouseOut={($event)=>showFileUrl($event,'',false)}>i</span>
                                                </span>
                                            </Fragment>
                                             }
                                            </div>
                                        ))
                                    }
                            </div>
                            <div className="sa-answer-feedback-block">
                                <div className="sa-answer-left">
                                {modelType === 'generative_model'&& <Fragment>
                                    <div className="sa-answer-img">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M6.99607 1.06205C7.0236 0.841796 6.90264 0.629762 6.69903 0.541377C6.49542 0.452993 6.25792 0.509419 6.11582 0.679936L1.65109 6.03761C1.57393 6.13017 1.49578 6.22391 1.43888 6.30629C1.38507 6.38421 1.28681 6.53739 1.28378 6.73872C1.2803 6.9692 1.38301 7.18849 1.56229 7.33337C1.7189 7.45992 1.89949 7.48251 1.99379 7.49105C2.0935 7.50008 2.21554 7.50005 2.33604 7.50003L5.43354 7.50003L5.00379 10.938C4.97626 11.1583 5.09723 11.3703 5.30083 11.4587C5.50444 11.5471 5.74194 11.4906 5.88404 11.3201L10.3488 5.96245C10.4259 5.86989 10.5041 5.77615 10.561 5.69376C10.6148 5.61585 10.713 5.46266 10.7161 5.26134C10.7196 5.03085 10.6169 4.81157 10.4376 4.66669C10.281 4.54013 10.1004 4.51755 10.0061 4.50901C9.90636 4.49998 9.78431 4.5 9.66381 4.50003L6.56632 4.50003L6.99607 1.06205Z" fill="#6938EF"/>
                                        </svg>
                                    </div>
                                    <div className="sa-answer-text">Answered by AI</div>
                                    </Fragment>}
                                </div>
                            </div>
                        </div>

                    </Fragment>
                ) : (
                    <Fragment>
                        <div class="sa-answer-result-block">
                            <div class="sa-answer-result-heading">{answersObj?.extractive?.snippet_title}</div>
                            <div class="sa-answer-result-desc">{answersObj?.extractive?.snippet_content}</div>

                            <div class="sa-answer-result-footer">1. {answersObj?.extractive?.source}</div>
                        </div>
                    </Fragment>
                )
            }
            {
                (searchResultObj?.isEnabled && searchResultObj?.searchResultsCount>0) &&
                <Fragment>
                <div class="sa-see-more-results-block">
                    <a class="sa-see-more-results-btn" onClick={($event)=>showMoreResults($event,searchResultObj)}>See More Results</a>
                </div>
                {(searchResultObj?.showResults) &&  <MemoizedSearchResultsComponent data={searchResultObj} onEvent={closeOverlayModel}/>}
                </Fragment>
            }


        </div>
    );
}
    const updateMsgData = (msgData:any)=>{
        let updatedMsgData = {...msgData};
        if(updatedMsgData?.message?.length && updatedMsgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.type == 'extractive_model'){
           let snippetData:any =[];
            msgData?.message[0]?.component?.payload?.answer_payload?.center_panel?.data.forEach((snippet:any)=>{
                const snippetObj =  {
                    "isPresentedAnswer": true,
                    "message": "Presented Answer",
                    "score": snippet?.score||'',
                    "snippet_content": [
                        {
                            "answer_fragment": snippet?.snippet_content,
                            "sources": [
                                {
                                    "chunk_id": snippet?.chunk_id,
                                    "doc_id": snippet?.doc_id||'',
                                    "image_url":snippet?.image_url||'',
                                    "source_id": snippet?.source_id||'',
                                    "source_type":snippet?.source_name||snippet?.source_type ||'',
                                    "title": snippet?.source||'',
                                    "url":snippet?.url||'',
                                    "page_no":1
                                }
                            ]
                        }
                    ],
                    "snippet_title": "",
                    "snippet_type": "extractive_model"
                }
                snippetData.push(snippetObj)
          })
            updatedMsgData.message[0].component.payload.answer_payload = {
              "center_panel": {
                  "data": snippetData,
                  "type": "citation_snippet"
              }
            }
          }
         
        return updatedMsgData
    }

export function answerTemplateCheck(props: any) {
   
    const hostInstance = props.hostInstance;
    const msgData = props.msgData; 
    if (msgData?.message?.[0]?.component?.payload?.template_type == 'answerTemplate') {
            props.msgData = updateMsgData(props.msgData)
        return (
            <Answers {...props} />
        )
    }   
}

class TemplateAnswers extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(answerTemplateCheck, msgData, this.hostInstance);
    }
}

export default TemplateAnswers;

