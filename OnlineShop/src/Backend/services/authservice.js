import axios from "axios";
export const incorrect = 'password or email incorrect'
export const passwordmatch = 'credentials doesn´t match'
export const authservice = {

    onlogin: async (email, password) => {

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email: email,
                password: password
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    },


    onregister: async (username, email, password, repeatpassword) => {
        if (!verifydata(password, repeatpassword)) {
            return false
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username: username,
                email: email,
                password: password
            })

            // if (!password === repeatpwd) {
            //     setemail('')
            //     setnombre('')
            //     setpassword('')
            //     setrepeatpwd('')
            //     setmessage('passwords doesn´t match')
            // }

            // if (!response.ok) {
            //     return false
            // }
            return true
        } catch (error) {

            console.log(error)
            return false
        }

    }

}

function verifydata(password, repeatpassword) {
    if (password !== repeatpassword) {
        return false
    }
    return true
}