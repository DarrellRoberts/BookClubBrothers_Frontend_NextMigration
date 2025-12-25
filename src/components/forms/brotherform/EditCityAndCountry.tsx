"use client"

import { useState } from "react"
import { Form, Input } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiInput } from "@/components/ui/input/UiInput"

interface props {
  id: string
  inCity: string
  inCountry: string
}

const EditCityAndCountry: React.FC<props> = ({ id, inCity, inCountry }) => {
  const [country, setCountry] = useState(inCountry)
  const [city, setCity] = useState(inCity)
  const [error, setError] = useState("")
  const [loadings, setLoadings] = useState([])

  const token = useAppSelector((state) => state.token.tokenState)

  const handleSubmit = async () => {
    try {
      setError(null)
      const response = await fetch(`${config.API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userInfo: { residence: { country, city } },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error)
        console.log("something has happened")
      }

      if (response.ok) {
        return
      }
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        document.location.reload()
        return newLoadings
      })
    }, 500)
  }
  return (
    <>
      <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
      >
        {/* Country */}
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              message: "Please write your country",
            },
          ]}
        >
          <UiInput
            handleChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
            value={country}
            type="text"
          />
        </Form.Item>

        {/* City */}
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              message: "Please write your city",
            },
          ]}
        >
          <UiInput
            handleChange={(e) => setCity(e.target.value)}
            defaultValue={city}
            value={city}
            type="text"
          />
        </Form.Item>

        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <UiButton
            textContent="Submit"
            loading={loadings[0]}
            clickHandler={() => enterLoading(0)}
            htmlType="submit"
            ghost
          />
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditCityAndCountry
