import { useEffect, useState } from "react"
import axios from "axios"

export const useSwitch = (url) => {

    const [data, setdata] = useState(null)
    const [single, setsingle] = useState(false)

    useEffect(() => {
        axios.get(url)
            .then(function (fetch) {
                setdata(fetch)
                setsingle(true)
            })
    }, [url])

    const merge = [data, single]

    return [merge]

}