import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { sendEmail } from '../Services/email.service';

function EmailSender() {
    const [emailData, setEmailData] = useState({
        to:"",
        subject:"",
        message:"",
    });

    const[sending,setSending]=useState(false);

    function handleFieldChange(event,name){

        setEmailData( {...emailData, [name]:event.target.value });
    }

    async function handleSubmit(event){
        event.preventDefault();
        if(emailData.to=='' || emailData.subject=='' || emailData.message=='')
        {
            toast.error("Invalid Fields");
            // alert('Please fill all the details');
        }

        // send mail using API
        try {
            setSending(true);
            await sendEmail(emailData);
            toast.success("Email Send Successfully.");
            toast.success("Send another one.");
            setEmailData({
                to:"",
                subject:"",
                message:"",
            });
        } catch (error) {
            console.log(error)
            toast.error("Email not send !!");
        }
        finally{
            setSending(false);
        }
        console.log(emailData);
    }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <div className="email_card md:w-1/3 w-full mx-5 md:mx-0 bg-white -mt-10 p-4 rounded-lg border shadow">
            <h1 className="text-gray-900 text-3xl  font-bold" >
                Quick Mail</h1>
            <p className="text-gray-800 ">
            Send email to person with your own app.
            </p>
            <br />
            <form action="" onSubmit={handleSubmit}>


                {/* to */}
                <div className="input_field">
                <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    To
                    </label>
                <input 
                value={emailData.to}
                onChange={(event) => handleFieldChange(event,"to")}
                type="text" 
                id="large-input"
                placeholder="Enter here" 
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
                </div>
  
                <br />



                {/* subject */}
                <div className="input_field">
                <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Subject
                    </label>
                <input 
                value={emailData.subject}
                onChange={(event) => handleFieldChange(event,"subject")}
                type="text" 
                id="large-input"
                placeholder="Enter here" 
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
                </div>
                <br />

  
                {/* message box */}
                <div className="form-field_mt-4">
                <label 
                for="message" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your message
                    </label>
                <textarea 
                value={emailData.message}
                onChange={(event) => handleFieldChange(event,"message")}
                id="message" 
                rows="8" 
                className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Write your thoughts here...">

                </textarea>
                </div>


                {/* loader */}
                {sending && (
                    <div className="loader flex-col gap-1 items-center flex justify-center mt-2">
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <h1>Sending Email..</h1>

                </div>
                )}
                

                {/* button */}
                <div className="button_container flex justify-center gap-2 mt-4 py-2 ">
                    
                   <button disabled={sending} type="submit" className="bg-blue-700 text-white hover:bg-blue-900 px-2 py-1 rounded">
                        Send Mail
                    </button>
                    <button className="bg-gray-700 text-white hover:bg-gray-900 px-2 py-1 rounded">
                        Clear
                    </button>
                </div>
    

            </form>

        </div>
    </div>
  );
}

export default EmailSender
