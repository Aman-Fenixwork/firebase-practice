import admin from "firebase-admin";

const customToken = (req, res) => {
    admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": "fir-practice-257ae",
            "private_key_id": "83f533ec74d74c295ac1959bc4f75893eff3127a",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDa3DDJJGRrI3BN\n1Wz3rM6WDP1ubjNxJ/eXfJmtz6LiVJ8wf+scnWvhauWQr25WaKariWRJzYJobNxA\nXj/6kOWWHLpdsVd0izm/MmiznHcsi0mYuLkn8myZpNlREPuaYKP6Ohc10uSELWTs\nFtVhJ3O9dSthjCHWeMm35jaotOyWrY8eSZ7FcbhkowoDYvsDRFeLnJI3/dhEdhQa\nhxpCiTHTjwdV9IB8uFbG2e9dgJwaT5lssKfLRCH6kVzo2Yd6em68bdFP2iQw7MeG\nRVdihMfXeXZcAwXHY8acTJawmzqZr16NeDJ1GDtIata5FRlR7qzGOJTHV6YMX4X0\nflckVYsJAgMBAAECgf8g/49xWjZDjkPv3Dw+wzQGHByNfa3EbiAp8hCeqr6gcpTT\noOpkiTmHCcYdAGLfn7M0hOx+OWRj8KYszt1ltteFC2D8ZF0Zl+2ucv7HP5WPxvrt\nlH4qj0ZQBGKXJMOOZcwdYpSzrPuaJ1PaReUd7NxqLutRYYwjutF5HAd4oAsl9FUJ\nv9OwrqXt/z2+Hrf66a/AZcECKJGnNp4UCSwTEkGbNA9KjyUJbuN8zwaZn7OPO5+n\nf18mQX4rYghPFOEUbiO92wt7JtUchajknwermpjzl+uniGN1BhnVxOHQ2VLixKOh\nhmlerTbGdQsaw0zfe16Q7D1bKvVHzHGVcBIbfMECgYEA/fR4RYOqgXbk8WW0kvS1\nwpP8a2WC1LMm90ekpbR6kLxsyQHEJkryl5MXFH2NaAUOHTQURLC7AdhhVjVpKELQ\n7eLfCGG9r0a9ALfpBIlsx14nBiwRhOc1rsr2TsFCvhu13rw5gle9Ve6NrQ0J5n41\n3Tt/5ZHX/uS/Znc0kvt4V0ECgYEA3J9fWbLfTf4z99iTFrgeJEk5kdO3GhbEQw36\nFyG87YvfUwlwpAztLeyF1BKAB2ZB2r05C9IFctwOpNyKGvKBEcOAY3eyS3805oB3\nuki/TdBtQb28qJT5emmm4f4OsSrAFsDEiusdZSeiCn5UQpS649yomKct6bND1QyH\nWf+XyckCgYAaKfW6M7Z9YCJ2PGQ+P7f6NATti6fPAiYhk+ACsnVuM/uBOg1bZJ1Z\nwG3ATq8i6GJr39G2wf6CUii1GQucekXMPHN+CZPhWwhd6pS3QvFSGQEsQZ4Mc0W0\nnHSD6KVXsMMsD3hdVWzMTaeLDKzYcmhaQqcKn9wBBtAxXlasTfw4AQKBgBTuohNW\nn009Ex0u1TXQnjt/HxEw7yxwgIqEJvhO4SgAn123hZJrD43N5Ryr7K3HC/R/A4yV\njqLJMjJ+IjRQUeKnk+TcFHSJSzGbesCX6l6tqdAU+nNcPxdYMtc6TZaNodAG1h8A\nE7fnPL6WIdR3XAwGgZCKPBbyRTtPhwAI+hPRAoGBAJ/JAxD6rblkfdW4kNZuWj5c\ntFRfkBHkfjmYrrNwQ+EqqOFutQlrkcN8uYH46KmzHsYW2q70kX+8kPHrxa+N3lxf\nCeh6LuZbA4Q1bTOVV+Qlf0sA0Qcsn+amSmg4haaOCEYxEABSlQobqcvXD9Gm0D6h\nAamk4kebq4SYndsnRceO\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-eqqbr@fir-practice-257ae.iam.gserviceaccount.com",
            "client_id": "118281270718531051915",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eqqbr%40fir-practice-257ae.iam.gserviceaccount.com"
        }),
    })
    
    const uid = "NRNqelPaOlcGtwtJkh7siSHtxol1";
    
    const additionalClaims = {
        premiumAccount : true
    }
    
    admin.auth().createCustomToken(uid,additionalClaims)
        .then((customToken) => {
            console.log(customToken);
            res.status(200).json({ token: customToken });
        })
        .catch((e) => console.log("Error :",e))
}

export default customToken