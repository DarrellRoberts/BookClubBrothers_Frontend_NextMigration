"use client"
import {useEffect} from "react"
import Link from "next/link"
import { SwapRightOutlined } from "@ant-design/icons"

const Back:React.FC = () => {

let landingPage = null;

function removeLastPathSegment(url) {
    // Create a URL object
    const parsedUrl = new URL(url);
    // Get the pathname as an array of segments
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    // Remove the last segment
    pathSegments.pop();
    // Update the URL object with the modified pathname
    parsedUrl.pathname = '/' + pathSegments.join('/');
    // Convert the URL object back to a string
    const modifiedUrl = parsedUrl.toString();
    return modifiedUrl;
  }

useEffect(() => {
    if (typeof window !== "undefined") {
        landingPage = window.location.href;
        landingPage = removeLastPathSegment(landingPage)
    }
}, [])
return (
<>

    <div className="float-right m-5 font-semibold text-3xl flex flex-col">
        <h2>Back</h2>
        <Link href={landingPage ? landingPage : "/"}>
        <SwapRightOutlined />
        </Link>
    </div>
        </>
    )
}

export default Back