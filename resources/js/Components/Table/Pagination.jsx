// resources/js/Components/Pagination.jsx

import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import TextInput from '../Input/TextInput';
import { Button } from '../Button/Button';
import { useTheme } from '@/app';
import { applicationTheme } from '@/Common/Theme';

const Pagination = ({ page, size, totalData, onPageChanged, showResultPage, ...props }) => {
    const { theme } = useTheme();
    const { borderedBottomTheme, borderedTopTheme } = applicationTheme(theme);

    const [inputWidthClass, setInputWidthClass] = useState('w-10')
    const [pageMeta, setPageMeta] = useState({
        page: 1,
        totalPage: 1
    });

    const isPagePrevButtonDisabled = pageMeta.page == 1;
    const isPageNextButtonDisabled = pageMeta.page == pageMeta.totalPage;

    if(totalData < size) {
        size = totalData
    }

    const getTotalPage = () => {
        return Math.ceil(totalData / size);
    }

    const onPageChange = (page) => {
        setPageMeta({...pageMeta, page, totalPage: getTotalPage()});
        if(page.length < 1) {
            setInputWidthClass('w-10');
        }
        if(page.length == 2) {
            setInputWidthClass('w-12');
        }

        if(page.length == 3) {
            setInputWidthClass('w-14');
        }

        if(page.length == 4) {
            setInputWidthClass('w-16');
        }

        onPageChanged(page);
    }

    const onNextPageChange = () => {
        onPageChange(pageMeta.page + 1);
    }    

    const onPrevPageChange = () => {
        onPageChange(pageMeta.page - 1);
    }

    useEffect(() => {
        setPageMeta({
            page: page,
            size: size
        })
    }, [page, size, totalData])

    return (
        <div className={`px-6 mt-4 flex items-center justify-between py-4`}>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                {showResultPage ? <div>
                    <p className="text-sm ">
                        Tampilkan <span className="font-medium">1</span> s/d{' '}
                        <span className="font-medium">{size}</span> dari{' '}
                        <span className="font-medium">{totalData}</span> hasil
                    </p>
                </div> : null}

                <div className='inline-flex items-center'>
                    <p className="text-sm ">
                        Total Halaman: {getTotalPage()}
                    </p>
                    <div
                        className="inline-flex -space-x-px"
                        aria-label="Pagination"
                    >
                        {/* Page Buttons */}
                        <Button
                            onClick={onPrevPageChange}
                            disabled={isPagePrevButtonDisabled}
                            className={`ml-3 px-3 py-2 text-sm rounded-lg`}
                        >
                            <FaAngleDoubleLeft />
                        </Button>
                        <div><TextInput value={pageMeta.page} className={`text-center h-8 ${inputWidthClass}`} onChange={(e) => onPageChange(e.target.value)}/></div>
                        <Button
                            disabled={isPageNextButtonDisabled}
                            className="ml-3 px-3 py-2 text-sm rounded-lg"
                            onClick={onNextPageChange}
                        >
                            <FaAngleDoubleRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
