/* eslint-disable no-undef */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: 'dhqqzaaid/image/upload/v1706643301/**',
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/**", // Matches the book cover path structure
      },
    ],
  },
}
