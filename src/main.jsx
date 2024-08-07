import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import viVN from "antd/lib/locale/vi_VN";
import messages from "./locales/vi-VN.json";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={viVN}>
    <IntlProvider locale="vi" messages={messages}>
      <BrowserRouter>
        <App />
        </BrowserRouter>
    </IntlProvider>
  </ConfigProvider>
)
