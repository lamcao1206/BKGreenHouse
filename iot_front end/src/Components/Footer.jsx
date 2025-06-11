import React from 'react'

const Footer = () => {
  return (
    <section className="d-flex justify-content-between align-items-center p-5 bg-emerald-600" style={{ fontFamily: "'Quicksand', sans-serif'"}}>
    <div className="container d-flex justify-content-between align-items-start ">
        <div>
            <h5 className="fw-bold">Address </h5>
            <p className="mb-3 text-white"  >Cơ sở 1 - 268 Lý Thường Kiệt, Phường 14, Quận 10, Tp.HCM</p>
                <div className="gmap" style={{width: '130%', height: '300px'}}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504707346954!2d106.657698!3d10.772603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec17709146b%3A0x54a1658a0639d341!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgLSAyNjggTMO9IFRoxrDhu51uZyBLaeG7h3Q!5e0!3m2!1sen!2s!4v1719220764881!5m2!1sen!2s"
                            width="100%"
                            height="100%"></iframe>
                </div>
        </div>
       
        <div className="ms-5">
            <h5 className="fw-bold">Các dịch vụ</h5>
            <ul className="list-unstyled mb-0">
                <li className=""><a className="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="#">Hỗ trợ</a></li>
                <li className=""><a className="text-decoration-none text-white indam " href="#">About Us</a></li>
            </ul>
            <div className="mt-4">
                <h5 className="fw-bold">Timing</h5>
                <p className='text-white'><strong>Mon - Fri</strong> <time datetime="09:00">09:00 AM</time> - <time datetime="17:00">05:00 PM</time></p>
            </div>
                <div className="mt-4">
                    <p className='text-white'><strong>Phone Number (liên hệ để hỗ trợ):</strong>
                        <br />
                        (84-8) 38647256 - 5258</p>
                </div>

        </div>
        
        <div class="me-5">
            <h5 class="fw-bold">Contact Us</h5>
            <ul class="list-unstyled d-flex mb-0 mt-3 me-5">
                <li class="ms-1"><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                <li class="ms-3"><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i></a></li>
                <li class="ms-3"><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a></li>
                <li class="ms-3"><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://www.pinterest.com" target="_blank"><i class="fab fa-pinterest-p"></i></a></li>
                <li class="ms-3"><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://www.youtube.com" target="_blank"><i class="fab fa-youtube"></i></a></li>
            </ul>

            <br />

                <h5 class="fw-bold">Links to some HCMUT website</h5>
                <ul class="d-flex flex-column mb-0 mt-3 me-5 list-disc ">
                    <li class=""><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://lms.hcmut.edu.vn/" target="_blank">HCMUT LMS</a></li>
                    <li class=""><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://mybk.hcmut.edu.vn/my/index.action" target="_blank">MyBK</a></li>
                    <li class=""><a class="text-decoration-none text-white indam transition-all duration-700 hover:scale-105 hover:shadow-xl" href="https://bkpay.hcmut.edu.vn/bkpay/home.action" target="_blank">BkPay</a></li>
                    
                </ul>
        </div>
    </div>
     
     
</section>
  )
}

export default Footer
