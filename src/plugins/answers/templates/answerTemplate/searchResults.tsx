import { h } from 'preact';
import SearchResultsSvgIcons from './searchResultsSvgIcons';
import { useState } from 'preact/hooks';
import { memo } from 'preact/compat';
// Use memo to prevent unnecessary re-renders
const MemoizedSearchResultsComponent = memo(SearchResults, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
});
export function SearchResults(props: any): any {
    const propsData = props.data;
    const [answersObj, setAnswersObj]: any = useState({ "index": 0, "data": propsData.data[0] });
    const [overlayAnswersObj, setOverlayAnswersObj]: any = useState(propsData.data);

    const clickedArrow = (type: string) => {
        let data_index = answersObj.index;
        if ((props?.data?.data?.length - 1) >= data_index) {
            if (type === 'left') {
                if (data_index > 0) data_index--;
            } else {
                if ((props?.data?.data?.length - 1) !== data_index) data_index++;
            }
            setAnswersObj((prevState: any) => ({ ...prevState, data: propsData.data[data_index], index: data_index }))
        }
    }

    const closeModel = () => {
        props?.onEvent();
    }

    const searchEvent = (event: any) => {
        let searchText = event.target.value.trim();
        let filteredData = searchText?.length ? propsData?.data?.filter((item: any) => (item?.snippet_content[0]?.sources[0]?.title?.toLowerCase()).includes(searchText.toLowerCase()) || (item?.snippet_content[0]?.answer_fragment?.toLowerCase()).includes(searchText?.toLowerCase())) : propsData?.data;
        setOverlayAnswersObj((prevState: any) => (filteredData));
    }
    let seachResultsTemp;
    switch (propsData?.type) {
        case 'overlay':
            seachResultsTemp = <div class="sa-search-results-block overlay-popup">
                <div className="sa-answer-overlay-block">
                    <div className="sa-overlay-header-block">
                        <div className="sa-search-results-header">Search Results ({overlayAnswersObj?.length})</div>
                        <div className="sa-overlay-close">
                            <span className="close-icon" onClick={closeModel}>Close  <SearchResultsSvgIcons type={'close'} /> </span>
                        </div>
                    </div>
                    <div className="sa-overlay-search-block">
                        <div className="sa-overlay-search-icon"><SearchResultsSvgIcons type={'search'} /></div>
                        <input type="text" className="sa-overlay-search-input" onKeyUp={searchEvent} onKeyDown={searchEvent} placeholder="Search" />
                    </div>
                    <div className="sa-overlay-search-list">
                        {overlayAnswersObj?.length ?
                            overlayAnswersObj?.map((result: any) => <SearchListTemplate data={result} />) :
                            <div className="sa-no-result-block"><SearchResultsSvgIcons type={'search-empty'} /><div className="sa-no-results">No Search Results Found</div></div>
                        }
                    </div>
                </div>

            </div>;
            break;
        case 'carousel':
            seachResultsTemp =
                <div class="sa-search-results-block">
                    <div className="sa-search-results-header">Search Results</div>
                    {
                        <SearchListTemplate data={answersObj?.data} />
                    }
                    {
                        <div class="sa-answer-carousel-block">
                            <div class="sa-answer-left-arrow sa-cursor-pointer" onClick={() => clickedArrow('left')}>
                                <SearchResultsSvgIcons type={'left-arrow'} />
                            </div>
                            <div class="sa-answer-dot">
                                {answersObj?.index > 0 &&
                                    propsData?.data?.map((dots: any, index: number) => (
                                        answersObj?.index > index && <SearchResultsSvgIcons type={'dot'} />
                                    ))
                                }
                            </div>
                            <div class="sa-answer-count">{answersObj?.index + 1}/{propsData?.data?.length}</div>
                            <div class="sa-answer-dot">
                                {answersObj?.index < propsData?.data?.length - 1 &&
                                    propsData?.data?.map((dots: any, index: number) => (
                                        answersObj?.index < index && <SearchResultsSvgIcons type={'dot'} />
                                    ))
                                }
                            </div>
                            <div class="sa-answer-right-arrow sa-cursor-pointer" onClick={() => clickedArrow('right')}>
                                <SearchResultsSvgIcons type={'right-arrow'} />
                            </div>
                        </div>
                    }
                </div>;
            break;
        default:
            seachResultsTemp =
                <div class="sa-search-results-block">
                    <div className="sa-search-results-header">Search Results</div>
                    {
                        propsData?.data?.map((result: any) => <SearchListTemplate data={result} />)
                    }
                </div>
                ;
            break;
    }
    return seachResultsTemp
}

export default MemoizedSearchResultsComponent;

export function SearchListTemplate(props: any): any {
    const propsData = props.data;
    const listTemp = <div className="sa-search-results-list-container">
        <div className="sa-search-title-block">
            <div className="sa-icon-title">
                {propsData?.snippet_content[0]?.sources?.length && propsData?.snippet_content[0]?.sources[0]?.source_type && <div className="sa-search-icon">
                    <SearchResultsSvgIcons type={propsData?.snippet_content[0]?.sources[0]?.source_type} />
                </div>}
                {propsData?.snippet_content[0]?.sources?.length && <div className="sa-search-title">
                    {propsData?.snippet_content[0]?.sources[0]?.title}</div>}</div>
            {propsData?.snippet_content[0]?.sources?.length && propsData?.snippet_content[0]?.sources[0]?.page_no && <div className="sa-search-pageno">Pg {propsData?.snippet_content[0]?.sources[0]?.page_no}</div>}
        </div>
        <div className="sa-search-desc">{propsData?.snippet_content[0]?.answer_fragment}</div>
    </div>

    return listTemp;
}
