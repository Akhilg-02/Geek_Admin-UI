import axios from "axios";
import "../Css/admin.css";
import ReactPaginate from "react-paginate";
import {TiEdit} from "react-icons/ti"
import {AiFillDelete} from "react-icons/ai"

import { useEffect, useState } from "react";
import { Edit } from "./editList";
//import { useParams } from "react-router-dom";

export const Data = () => {
  const [table, setTable] = useState([]);
  const [serch, setSerch] = useState("");
  const [pageNum , setPageNum] = useState(0);
  // const {id} = useParams()
  // console.log(id);

  const userPerPage = 10;
  const pagesVisit = pageNum * userPerPage;

  const displayUsers = table
  .slice(pagesVisit , pagesVisit + userPerPage)
  .filter((val)=>{
    if (serch === "") {
      return val;
    } else if (val.name.toLowerCase().includes(serch.toLowerCase())) {
      return val;
    }
    
  })
  .slice(0,10)
  .map((e) => {
    return (
      <>
        <div className="container">
          <table className="table table-success table-striped">
            <tbody>
              <tr>
                <th scope="row">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </th>
                <td>{e.name}</td>
                <td className="email">{e.email}</td>
                <td>{e.role}</td>
                <td ><TiEdit onClick={<Edit/>}/> &nbsp;&nbsp;<AiFillDelete/> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  });

//---------------------------------------

  const fetchData = () => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        console.log(res.data);
        setTable(res.data);
      })
      .catch((err) => {
        return ("err:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //----------------------------------------------------------

  const handleSearch = (e) => {
    const serch_data = e.target.value;
    //console.log(serch_data);
    setSerch(serch_data);
  };

  const pageCount = Math.ceil(table.length / userPerPage);

  const changePage = ({selected}) =>{
    setPageNum(selected);
  }

  const handleEdit = ({id}) =>{
      console.log(id);
  }
 

  return (
    <>
      <div>
        <br />
        <div className="container input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default"></span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={handleSearch}
            value={serch}
            placeholder="Search by name"
          />
        </div>

        <br />
        <br />
        <div className="container">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
            
        {displayUsers}
 {/* --------------------------- Pagination -------------------------------- */}
        <ReactPaginate
         previousLabel = {"Previous"}
         nextLabel={"Next"}
         pageCount={pageCount}
         onPageChange={changePage}
         containerClassName={"paginationBtns"}
         previousLinkClassName={"previousBtn"}
         nextLinkClassName={"nextBtn"}
         disabledClassName={"paginationDisabled"}
         activeClassName={"paginationActive"}

        />
{/* ---------------------------------------------------------------------- */}
       
           
       

      





      </div>
    </>
  );
};













