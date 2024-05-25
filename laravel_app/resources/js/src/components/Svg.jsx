function Slogo({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="45" height="45" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_103_584" transform="scale(0.00666667)" />
          </pattern>
          <image
            id="image0_103_584"
            width="150"
            height="150"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC7lBMVEUAAAAPeA8QexARehESfRIPfA8PfA8Oew4TeRMUgBQUdhQccRwOfQ4QfRAQfBAQfBAQfBAQfBAQfBAQfBAQexAQfBAQfBARfBEQfBAQgBANgA0QexARfREPfA8QfBAQfBAQexAQfRASexIQehAQexAQfBAQfBAPew8Pfg8AVQARehEQfBAQfBARfBEQfBAQfBAPew8RfREPgA8QfRAQfBAQfBAPfQ8RexEQfBAPfA8MgAwQfBARfBEQgBARfREPfA8QfBAPew8PfQ8QfBAQexAPfA8QfBAQfBAQfBAQfBARfREQexAQfBAQfBAQexAQfRAPew8VgBUAAAARdxERehEPfA8QfBAQfBARexERfREAZgAAgAAQfBARfRERfREOgA4QexAQfBAQexAQexAXdBcQfRAQfBAQfRASgBINeQ0QfBAPfA8OfQ4RfBEQfBAPfA8Pew8PfQ8RfREQfBAQfBAPew8SgBIQfBAQfRAQfRAPew8RexEQfBAQexARehENeQ0QfBAPfA8QfBAUehQQfBAPfA8AbQAQfBAQfBAOfA4QfBARfBEPfA8QfBANfA0RfREQfBAAgAAQfBAQfRAQfBAQfBASfRIOgA4Ofg4AgAAQfBAQexAQexATexMQfRAQfBAPeg8RexEPfA8PfA8QfBAPfA8RfBERfBELegsQfBAQfRAQexAQexAAgAAPfA8PfA8QfBAQfRAQfBAQfhARfREQfBAPfA8TfBMPfA8QfBAQexARexERfBEMeQwQfBARfBESexIQfBAPew8RexEQfBAQfBARfBEagBoPfA8QfBARfBEQfRAPfQ8QfRAQfBAQfBAPfA8VgBUSeRIPfA8QfBAPfg8QfBAQfRAQfBARexERexERfREPfQ8QfBAQfBARfREQfBAQfRAPfQ8RfBEQfBAQfBAQfBAQfBAQfBAPfA8QexAQfRARfBEPew8QfBAQfBARgBESexIQexAPfA8QfBAQfRAPfQ8QfBAQfBD///9610tSAAAA+HRSTlMAER8uOURGNigaDQk1YoyxyuX89tvCo3lQIBRPi8b54J9eHTB8yf2XQwMs4uqYb82VLSKR9MxmPOiEFrOIED3H7HRk3N33+uTTUliT0PW+jzQYAQ9L5/u/ejsFAo6qXBKb8rxfC2D+gRwmlFQ3ad4jVdda1ON2DnG0L1NNw99JE86m0RnaZQfB8yXATKfFJ4npCO6N8JIrJEcE8bpwG4PmMpm11m1ne5oX4TFyXQaWQmGs+EFqfbcpd61+uMgVoag67bZb0q+pCobrSq5W1U67Ywwqpb1FxD+cWXhshYLvaKvZh7nPc6SAoHVusthXf5AeOD4hQLAzolJRIToAAAABYktHRPlMZFfwAAAAB3RJTUUH4QgJBxMq46/4DQAACWBJREFUeNrdXHlYTlkYv0mTJlSStY1UIiEJZY+yFEkTimz5MnbGLrJ+wpgWjZ2MsRUxYxsjjN2YxTrMMIZpmDEMM2Yz58+p76u+u5z13nu+PN7n8TzqvO97fvfcc97zbl1BeH3JpoptVTs7uzdK/tlXc3izsuE4Vq9R08nZpRaQkmtttzp169WvFEgNGrp7eAIceXk3amxdTD5NfP0ADdX2bxpgJUzN3JsDBgpsYQVkNkEtATMFtmrNFVRwmxCgjtqGOvIC1c7JD6in9h3CuIAKBxoppGMnvUF17gJ0oK7d9H2V3SN6lJBXTw2QIqNKNLj06s3FiLbu0zeadYfF9OtfI3ZAHG8jMTC+xVu0kBIGDR6SaDUzn9RuqBfFMg1LHm71W7HqiJE4TH6jRleSL5Eyxs2AAOWSOrYyfZu3x8VAQPUbnyhUMg0McpG9vfAJr4Rz6jhxkgVUT//Jr4zXnDRlqhnUyDYOr5Q7HzDtHQCmz5jJeZrEWaNmD57DtGJz5zG5e50aefumMe5CGw/TO5mfyilQiFsQbgoEPMezSKUvLN/BtRZxcCwTQ6dW6O/OsFaLxefde4nOqHovFak3LKMVMy6XGqKMoCQdQa1YKbvMV1G+93cVVnv1e7qZklmKWyHEnkoyE3KbZEzTB1X91RDlWVUoJJPhd69/tg6oGuZAdfsayXdvBsInaKn5Uklcg/I3WhG3+0KkA5VbT6PDvRLtnJH2yPsYx84wQwuqtT1wsdo6rOx6A9YLbrFBNar4jVjNbjgb5BhB8M43DVSJqkYCQfNmjHBHYtQQvUXVFbiVHI4EI6VbR5KjmbxtKryeDyhCNyfkM3nQRH4j7Zgjke1UIWU8QnwKXUTq2YcN1XAPOr214UY14EPKSNnQjQXVksW0EfgOqPxO+qxCG/qEQnAEtdZAWLjrGMWQ7fCmdXVsAxm07oIomMWShNlNu1h7pjNozVEu14Z8BvnVRuqXWODKoHevQnwag3Q+SxZ0H4PiqEK5dFt6YdcCJgOxnwHXaJnsAQbZjxjdrOX0qn1lsh/Ti/qzWvkl7emVS1/E8IP0D2RkvhMP1VL5zIfpbZ6aqtcRavUbJRlyZ1oxvzdUhWFHqXGJo/9PqKWOqfTjqa3qpyKp47RCRWqz6xM8KWfoKfJ/T9CWk/ao9uX30j65xW06SVmXMKxSjUqI204J61SFSCNKiaFaAjKHrpRHvcI5+YxOYKFRCyxhLuXDV2RK8ujKgdU0BvvebId9Cx17d42ohJmTqOaZXcZej4o7XHvC5jTVJZRblhneSsN8Ro+EeweqBbA1M5+l4T1HmrIwtRfR4yk8TzNVspmZojIILpBmrFbaH3HxEoErNoFirs/NIQ+FMb1MMu9fmGuLLUnlukwKWF+aYyYKzq8Is4WWr0IeoS5h/Jo8mbOJczyZcRh+rg3+Ikf/Cp63HfndRJkYd5FPIT7S6XRVkme/pj7fWFbZMFmIU0Q+/ESTp8ou9LpY9uvzifOZmkvSSFzLsU6WT5YyRYFNBawnwjKl9kjoPW/gJrE/AxG5ic2xDiPBWlHqCJGCnlTcFE3haXwnnLMxIJcwY2kdM4zAsxRXvqiHeqazjho81dMlPHMIHukhnLlC373fpGAMSjR+zlslPFXxLHUwqI7hsvi3Mbny0/j0f2m55FssRwbacYgjpMs9ML0s32El75Rw3MJy3EWrHko6ULevo6vOXUkhLDZXsxR9otzJd5Yben99j5O7Qrqp45F679F4TmnI9drQCyO2nuDJb0KiovJoceu1ACNVeviN6FPhiSxR/0AbI29C2q8itNAQfDi2BqWSOmcBQBHKGq9FO6qxpeOrkSFIOkJjN5ZcORIXOqdq6gipgxodjNA3AzBReCFczcn7KIlg3D7JQ2zXfQY2WOAswsoMRgmYJh6DGHwAV3YlAbDSj/BWpRREqjfGNIq4FIvh7X2dXQE77YY7kpvh3D3MXqwfMYlpoWY5QA39BFWWDf97gIfmUWgnwCPoA9Z3AeroZ7hjBOUdZx68ABubAj08xSpRAQM0EZAILTZONA+mQoamwqKEbA3d6Qnx1A09Zb1/VyBDjWAO1i9AA2XAClgBEehE0nDlnp8EC12aAE2UB6t/QMonZ8vHlHmBnbDeOT9tsEA0xF11DESXhhXdE3kQu1wQArTS9iSaWz8WWSB9DKm+TQfaCRJypsuftn0F9j2y15OgbKQpPKEDKuAXT06V/GoZ6oIuB5VRG6AL5SgbfCYbkKm0XcrwUVWfC0XJQemtDpIwHBSFl9Iwo7bi3lmXqxcsSDg8GpKhLCNx3yx4ojjF0UA/UtxCKRvhBTKZpTRUYYuBGSlkhVz9CPGoxPesIjqLaXKxO0BX8pA7hadFg4ukQ/0sI0/lFuuMvrDAEXklW5RPPCAdOmcZkfda/qYzKhBZXTaDJch5JjttiRVtUsXYg6ILPbuEWpNZilyVzDcsp7H39YcFMmXeZfnOjrFRJNfLk6DPpb8/ygEViGwmnaTcALkrr5c1ZUMOfMy7LGUSB6vLZpxUwgozF5NcpIbUiw8sMEYyzVPzLzvC/OrHpqGjkt/9zgkV6NpAEnya73HoXw3OvFw6VlOy30N4wQJ/SDY21GCKl1LS/HmTGyrQU1J5dEWH8eZ0eUNxj7OBHyzQQjx1vmxmCVUvsR+dodaXh5EIlnYmFqFz2rsBEF0MLyJ5wgLeElfQFd2YLqS3B39afurPFRXwFBVPPcBxXMErXtR0ZJPBFxYQdWzP74Xv39lvyUw+4IxK5C5kk1pZL+2v+G8ab1jgr4pY4i6pzWIda6+ZHjaiE31v3znuqEBzFW06ffnDAn+zw1ppBVhz2WFFWAHWE3ZYWVaA1ZEdVr4VYHVgh+VmBViH2WFttQIsH3ZYjSO5o3JW0194nDeqGB81sAKc+KI6OE9dO6YxnCeq3H/UtokGcHQE830E9fQ8hxOqf7V9SWbsVS7bKkjrN4DiQmN0R+WxVodG5Bu++oLK2KHPBxOSJuq4wwwXXwh6UdgpveJr5yGCnvTyoR6gJiXr/rmrQ5qLUV7LuHyiyK5Iy6ucv7NQ4ERz/juoEpRbb67fNEwPOq/CJHhvE7iT/VCmhGqto8kpgnXo5b1HdDH35UWjwwRrUoPxrc5je5P8ik89sE0SKoGyq4fuLypWnIIs32GZY2IvCZVLSVsKDvS+FlpKz6ccsHUwCq8t/Q+Er6uc42n9vwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0wOVQwNzoxOTo0MiswMDowMJhHn1UAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMDlUMDc6MTk6NDIrMDA6MDDpGifpAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    </div>
  );
}

function Shome({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 20V12.174C22.0001 11.6296 21.889 11.0908 21.6735 10.5908C21.458 10.0907 21.1428 9.63995 20.747 9.26603L13.374 2.29803C13.0027 1.94696 12.511 1.75134 12 1.75134C11.489 1.75134 10.9973 1.94696 10.626 2.29803L3.253 9.26603C2.85722 9.63995 2.54195 10.0907 2.3265 10.5908C2.11104 11.0908 1.99994 11.6296 2 12.174L2 20C2 20.5305 2.21071 21.0392 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0392 22 20.5305 22 20Z"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Sgroup({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 9.75C2 11.1822 2.64273 12.4698 3.64931 13.3417C1.7758 14.4194 0.5 16.4359 0.5 18.75V19H0.75H2.25H2.5V18.75C2.5 16.3951 4.39507 14.5 6.75 14.5C9.10493 14.5 11 16.3951 11 18.75V19H11.25H12.75H13V18.75C13 16.3951 14.8951 14.5 17.25 14.5C19.6049 14.5 21.5 16.3951 21.5 18.75V19H21.75H23.25H23.5V18.75C23.5 16.4355 22.2246 14.4199 20.3516 13.3421C20.817 12.9405 21.2012 12.4515 21.4815 11.9016C21.8211 11.2353 21.9987 10.4983 22 9.75042V9.75C22 7.13693 19.8631 5 17.25 5C14.6369 5 12.5 7.13693 12.5 9.75C12.5 11.1817 13.1423 12.4689 14.1482 13.3407C13.2821 13.8351 12.5458 14.5282 12 15.3625C11.4544 14.5285 10.7184 13.8356 9.85262 13.3412C10.3176 12.9398 10.7014 12.4511 10.9815 11.9016C11.3211 11.2353 11.4987 10.4983 11.5 9.75042V9.75C11.5 7.13693 9.36307 5 6.75 5C4.13693 5 2 7.13693 2 9.75ZM6.75 7C8.27918 7 9.5 8.22082 9.5 9.75C9.5 11.2792 8.27918 12.5 6.75 12.5C5.22082 12.5 4 11.2792 4 9.75C4 8.22082 5.22082 7 6.75 7ZM17.25 7C18.7792 7 20 8.22082 20 9.75C20 11.2792 18.7792 12.5 17.25 12.5C15.7208 12.5 14.5 11.2792 14.5 9.75C14.5 8.22082 15.7208 7 17.25 7Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
function Sstar({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.074 2.633C11.394 1.789 12.605 1.789 12.926 2.633L14.996 8.367C15.141 8.747 15.51 9 15.922 9H21.009C21.949 9 22.359 10.17 21.62 10.743L18 14C17.8379 14.1247 17.7194 14.2975 17.6615 14.4937C17.6037 14.6898 17.6094 14.8993 17.678 15.092L19 20.695C19.322 21.595 18.28 22.368 17.492 21.814L12.575 18.694C12.4066 18.5757 12.2058 18.5122 12 18.5122C11.7942 18.5122 11.5934 18.5757 11.425 18.694L6.50802 21.814C5.72102 22.368 4.67802 21.594 5.00002 20.695L6.32202 15.092C6.39059 14.8993 6.39637 14.6898 6.33852 14.4937C6.28068 14.2975 6.16217 14.1247 6.00002 14L2.38002 10.743C1.64002 10.17 2.05202 9 2.99002 9H8.07702C8.27731 9.00067 8.47308 8.9405 8.63843 8.82747C8.80378 8.71444 8.93092 8.55387 9.00302 8.367L11.073 2.633H11.074Z"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
function Schat({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="36"
        height="33"
        viewBox="0 0 36 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 14.4166H13.25M18 9.66663V14.4166V9.66663ZM18 14.4166V19.1666V14.4166ZM18 14.4166H22.75H18Z"
          stroke="white"
          strokeWidth="3.16667"
          strokeLinecap="round"
        />
        <path
          d="M21.1667 27.0833C27.1374 27.0833 30.1236 27.0833 31.9777 25.2277C33.8334 23.3736 33.8334 20.3874 33.8334 14.4167C33.8334 8.44592 33.8334 5.45975 31.9777 3.60567C30.1236 1.75 27.1374 1.75 21.1667 1.75L14.8334 1.75C8.8626 1.75 5.87644 1.75 4.02235 3.60567C2.16669 5.45975 2.16669 8.44592 2.16669 14.4167C2.16669 20.3874 2.16669 23.3736 4.02235 25.2277C5.05627 26.2632 6.44169 26.7208 8.50002 26.9218"
          stroke="white"
          strokeWidth="3.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.1667 27.0834C19.2097 27.0834 17.0532 27.875 15.0851 28.8963C11.9216 30.5382 10.3398 31.36 9.56085 30.8359C8.78185 30.3134 8.9291 28.6905 9.22518 25.4462L9.29168 24.7084"
          stroke="white"
          strokeWidth="3.16667"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
function Scart({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.97701 9.84C2.01724 9.3388 2.24477 8.87115 2.61429 8.53017C2.98381 8.18918 3.46821 7.9999 3.97101 8L16.029 8C16.5318 7.9999 17.0162 8.18918 17.3857 8.53017C17.7553 8.87115 17.9828 9.3388 18.023 9.84L18.826 19.84C18.8481 20.1152 18.813 20.392 18.7228 20.6529C18.6327 20.9139 18.4895 21.1533 18.3023 21.3562C18.1151 21.5591 17.8879 21.7211 17.635 21.8319C17.3822 21.9427 17.1091 21.9999 16.833 22H3.16701C2.89094 21.9999 2.61786 21.9427 2.36499 21.8319C2.11212 21.7211 1.88492 21.5591 1.69771 21.3562C1.51049 21.1533 1.36731 20.9139 1.27718 20.6529C1.18705 20.392 1.15193 20.1152 1.17401 19.84L1.97701 9.84V9.84Z"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11V6C14 4.93913 13.5786 3.92172 12.8284 3.17157C12.0783 2.42143 11.0609 2 10 2C8.93913 2 7.92172 2.42143 7.17157 3.17157C6.42143 3.92172 6 4.93913 6 6L6 11"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Ssearch({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20L15.514 15.506L20 20ZM18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Snotification({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.72099 4.00302L8.25499 4.00002C4.91099 3.99202 2.00799 6.70902 1.98499 10V13.79C1.98499 14.58 1.88499 15.351 1.45399 16.008L1.16699 16.446C0.729988 17.11 1.19999 18 1.98499 18H16.015C16.8 18 17.269 17.11 16.833 16.446L16.546 16.008C16.116 15.351 16.015 14.579 16.015 13.789V10.001C15.975 6.70902 13.065 4.01102 9.72099 4.00302V4.00302Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18C12 18.7956 11.6839 19.5587 11.1213 20.1213C10.5587 20.6839 9.79565 21 9 21C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 1C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3V4H7V3C7 2.46957 7.21071 1.96086 7.58579 1.58579C7.96086 1.21071 8.46957 1 9 1Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Ssender({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.2396 0.93077C21.1006 0.815358 20.9316 0.741828 20.7524 0.718748C20.5732 0.695668 20.3912 0.723989 20.2274 0.800411L0.581421 10.0218L0.581421 11.8062L8.83315 15.1068L14.1261 23.25H15.9108L21.5499 1.9031C21.5956 1.72828 21.5907 1.54407 21.5358 1.37192C21.4808 1.19977 21.3781 1.04678 21.2396 0.93077ZM14.8089 21.5481L10.2594 14.5486L17.2603 6.88066L16.1526 5.86929L9.09687 13.597L2.2933 10.8755L19.7984 2.65872L14.8089 21.5481Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function Scart2({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 21H18"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 21H10"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 7L18.79 7C19.0694 7.00001 19.3457 7.05857 19.6011 7.17191C19.8565 7.28524 20.0854 7.45083 20.2729 7.65801C20.4603 7.86519 20.6023 8.10936 20.6897 8.37478C20.777 8.64019 20.8078 8.92097 20.78 9.199L20.18 15.199C20.1307 15.6925 19.8997 16.1501 19.532 16.4829C19.1642 16.8157 18.686 17 18.19 17H8.64C8.17747 17.0002 7.72918 16.84 7.37144 16.5469C7.01371 16.2537 6.76866 15.8456 6.678 15.392L5 7Z"
          stroke="white"
          strokeWidth="2.17"
          strokeLinejoin="round"
        />
        <path
          d="M5 7L4.19 3.757C4.13583 3.54075 4.01095 3.34881 3.83521 3.21166C3.65946 3.0745 3.44293 3.00001 3.22 3H2"
          stroke="white"
          strokeWidth="2.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SarrowDown({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="18"
        height="21"
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.9165 19.0952L8.9165 1"
          stroke="#E6DED9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.999817 11.1786L8.91648 19.0953L16.8331 11.1786"
          stroke="#E6DED9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SarrowLeft({ clas, onClick }) {
  return (
    <div className={`bowl_svg ${clas}`} onClick={onClick}>
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_103_651)">
          <path
            d="M6 18L14 10L6 2"
            stroke="white"
            strokeWidth="3.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_103_651"
            x="0.416626"
            y="0.416626"
            width="19.1667"
            height="27.1667"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_103_651"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_103_651"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// const sgdgd = ({ clas, onClick }) => (
//   <div className={`bowl_svg ${clas}`} onClick={onClick}>
//   </div>
// );

export {
  Snotification,
  Ssender,
  Ssearch,
  SarrowDown,
  Slogo,
  Shome, SarrowLeft,
  Scart2,
  Sgroup,
  Sstar,
  Schat,
  Scart,
};
