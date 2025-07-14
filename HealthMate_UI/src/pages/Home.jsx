import backgroundImg from "../assets/images/1.jpg";

/*import About from "../components/About/About";*/
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import Testimonial from "../components/Testimonial/Testimonial";

const HeroSection = () => {
  return (
    <section
      className="hero__section relative w-full h-[630px] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container relative z-10">
        <div className="flex flex-col items-start">
          <div className="ml-[40px] text-left">
            <h1 className="text-[75px] font-bold leading-tight text-teal-500">
              Health Center for
              <br />
              Medical Care
            </h1>
            <p className="text-lg mt-6 mb-6 max-w-3xl text-black text-justify">
              Easily book health consultations online at your convenience.
              Choose your doctor, select a time, and complete the booking from
              any device. Get expert care anytime, anywhere.
            </p>
            <button className="btn bg-[#FFC300] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      {/* <About /> */}

      {/* Services Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-1 bg-teal-500 text-white p-2 inline-block rounded-md">
              Our Medical Services
            </h2>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-1 bg-teal-500 text-white p-2 inline-block rounded-md">
              Our Great Doctors
            </h2>
          </div>
          <DoctorList />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-1 bg-teal-500 text-white p-2 inline-block rounded-md">
              What our patients say
            </h2>
          </div>
          <Testimonial />
        </div>
      </section>
    </div>
  );
};

export default Home;
