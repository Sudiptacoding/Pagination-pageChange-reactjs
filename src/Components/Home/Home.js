import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ShowCard from '../ShowCard/ShowCard';

import './Home.css';

const Home = () => {

    const [item, setItem] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const getComments = async () => {
            const res = await fetch('http://localhost:8000/posts?_page=1&_limit=6');
            const data = await res.json();
            const total = res.headers.get('x-total-count');
            setPageCount(Math.ceil(total / 10));
            setItem(data);
        }
        getComments();
    }, []);

    const featchComments = async (currentPage) => {
        const res = await fetch(`http://localhost:8000/posts?_page=${currentPage}&_limit=6`
        );
        const data = await res.json();
        return data;
    };

    const handlePageClick = async (data) => {
        console.log(data.selected);
        let currentPage = data.selected + 1

        const commentFromServer = await featchComments(currentPage);
        setItem(commentFromServer)
    };


    return (


        <div>
            <div className='cardss'>
                {
                    item.map(item => <ShowCard item={item} key={item.id}></ShowCard>)
                }
            </div>

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Home;