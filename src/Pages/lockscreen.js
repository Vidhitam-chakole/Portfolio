import Login from "../components/user/Login";


function Lockscreen() {
  return (
    <>
      <video
        className="absolute bg-black h-screen w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/background_login.mp4" type="video/mp4" />
      </video>

      <div className="absolute left-0 top-0 h-screen w-full flex flex-col items-center justify-center z-10">
        <Login />
      </div>
    </>
  );
}

export default Lockscreen;