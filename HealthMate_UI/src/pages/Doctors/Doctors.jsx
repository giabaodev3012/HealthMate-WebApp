import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";

import { BASE_URL } from "./../../config";
import userFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDeboundceQuery] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search); // Lấy tham số query từ URL
  const specialtyFromURL = params.get("specialty"); // Lấy giá trị "specialty"

  useEffect(() => {
    if (specialtyFromURL) {
      setQuery(specialtyFromURL); // Cập nhật thanh tìm kiếm với giá trị chuyên khoa
    }
  }, [specialtyFromURL]);

  const handleSearch = () => {
    setQuery(query.trim());
    console.log("handle search");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDeboundceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = userFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0097B2] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 b-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specification"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md bg-[#0097B2] text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 m:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
