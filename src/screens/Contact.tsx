import { useForm } from 'react-hook-form';
import { usePlayerData } from '../hooks/useHome';
import { FormData } from '../Types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import "../App.css";

const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const PlayerData = usePlayerData();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // @ts-ignore
    PlayerData.mutate(data);
    console.log(data);
  };

  // Number options (00 to 99)
  const numberOptions = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <>
      <div className="main-content">
        <Header />
        <div className="container">
          <h2 className="mb-4" style={{ color: 'white' }}>Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form-sec">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fname" className="form-label">First Name<span className="text-danger">*</span> </label>
                  <input {...register("first_name", { required: true })} type="text" id="fname" className="form-control" placeholder="Enter Your First Name" />
                  {errors.first_name && <p className='text-danger'>This field is required</p>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lname" className="form-label">Last Name<span className="text-danger">*</span> </label>
                  <input {...register("last_name", { required: true })} type="text" id="lname" className="form-control" placeholder="Enter Your Last Name" />
                  {errors.last_name && <p className='text-danger'>This field is required</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Result Queries<span className="text-danger">*</span>
                </label>
                <div className="d-flex mb-2 flex-wrap gap-2">
                  {/* Number Dropdown */}
                  <select
                    className="form-select"
                    style={{ maxWidth: '100px' }}
                    onChange={(e) => {
                      const number = e.target.value;
                      const input = document.getElementById("company") as HTMLInputElement;
                      const market = input.value.slice(2) || '';
                      input.value = number + market; // Simply append the selected number and market name
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                    }}
                  >
                    <option value="">No.</option>
                    {numberOptions.map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>

                  {/* Market Dropdown */}
                  <select
                    className="form-select"
                    style={{ maxWidth: '150px' }}
                    onChange={(e) => {
                      const market = e.target.value;
                      const input = document.getElementById("company") as HTMLInputElement;
                      const digits = input.value.match(/^\d{0,2}/)?.[0] || '';
                      input.value = digits + market; // Simply append the selected market to the digits
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                    }}
                  >
                    <option value="">Market Name</option>
                    <option value="GAZIA">GAZIA</option>
                    <option value="GALI">GALI</option>
                    <option value="DISAW">DISAW</option>
                    <option value="SRIG">SRIG</option>
                    <option value="FARID">FARID</option>
                    <option value="DLBZ">DLBZ</option>
                  </select>
                </div>

                {/* Readonly input */}
                <input
                  {...register("company", {
                    required: "This field is required",
                    validate: (value) => {
                      const allowedMarkets = ["GAZIA", "GALI", "DISAW", "SRIG", "FARID", "DLBZ"];
                      const startsWithTwoDigits = /^\d{2}/.test(value);
                      const marketCode = value.slice(2).toUpperCase();
                      const validMarket = allowedMarkets.includes(marketCode);
                      const validFormat = /^\d{2}[A-Za-z]+$/.test(value);

                      if (!startsWithTwoDigits && !marketCode) {
                        return "Please enter number & market name in correct format (e.g. 23GZBD).";
                      } else if (!startsWithTwoDigits) {
                        return "Please enter a correct 2-digit number.";
                      } else if (!validMarket) {
                        return "Please enter a correct market name.";
                      } else if (!validFormat) {
                        return "Please use the correct format: 23GZBD.";
                      }

                      return true;
                    },
                  })}
                  type="text"
                  id="company"
                  className="form-control"
                  placeholder="e.g. 23GZBD"
                  maxLength={10}
                  onInput={(e) => {
                    // Just uppercase the input and show the combined value with no trimming
                    e.currentTarget.value = e.currentTarget.value.toUpperCase();
                  }}
                />
                {errors.company && (
                  <p className="text-danger">{errors.company.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    {...register("title", {
                      pattern: {
                        value: /^[A-Za-z]{0,8}$/,
                        message: "Only letters allowed, max 8 characters"
                      }
                    })}
                    type="text"
                    id="title"
                    className="form-control"
                    placeholder="Your Title"
                    maxLength={8}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z]/g, '').slice(0, 8).toUpperCase();
                    }}
                  />
                  {errors.title && <p className='text-danger'>{errors.title.message}</p>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="emailContact" className="form-label">Email<span className="text-danger">*</span> </label>
                  <input {...register("email", { required: true })} type="email" id="emailContact" className="form-control" placeholder="Enter Your Email" />
                  {errors.email && <p className='text-danger'>This field is required</p>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone<span className="text-danger">*</span> </label>
                  <input {...register("phone", { required: true })} type="text" id="phone" className="form-control" placeholder="Your Phone Number" />
                  {errors.phone && <p className='text-danger'>This field is required</p>}
                </div>
              </div>
            </div>

            <div className="form-group mb-0 text-center">
              <button type="submit" className="contactBtn btn-primary">Submit</button>
            </div>

            <div className="form-group" style={{ color: '#000' }}>
              <p style={{ color: '#000', marginTop: '15px' }}>
                <b style={{ color: 'red' }}>NOTE :</b> यदि आपको किसी भी प्रकार की समस्या हो, तो कृपया मार्केट के परिणामों के माध्यम से हमसे संपर्क करें।<br /><br />
                📌 संपर्क करते समय निम्नलिखित जानकारी अवश्य दें (सभी फ़ील्ड अनिवार्य हैं):<br />
                ✅ आपका पूरा नाम<br />
                ✅ आपका मार्केट नंबर<br />
                ✅ मार्केट का नाम (शॉर्टफॉर्म में, जैसे Ghaziabad = GAZIA, Gali = GALI, Disawar = DISAW, Shri Ganesh = SRIG, Faridabad = FARID, DELHI BAZAAR = DLBZ,)<br />
                कृपया परिणाम क्वेरी में इसे इस प्रकार लिखें: 45GZBD (न कि GZBD45 ❌)<br />
                ✅ आपकी समस्या का शीर्षक<br />
                ✅ आपकी ईमेल आईडी<br />
                ✅ आपका मोबाइल नंबर
              </p>
              <h5 style={{ textAlign: 'center' }}>⚠️ निर्देशों के अनुसार पूरी और सही जानकारी देने से आपकी समस्या जल्दी सुलझाई जा सकेगी।</h5>
              <h6 style={{ textAlign: 'center', color: 'blue' }}>Chat us : support@bgmgame.in</h6>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;