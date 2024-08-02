import React from 'react';
import { Table, Button, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const dataSource = [
  {
    key: '441',
    status: 'Đang tập sự',
    name: 'VŨ THẾ HOA',
    birthDate: '12/12/2001',
    internshipYear: '2024',
    idNumber: '112233445566',
    idIssueDate: '07/03/2024',
    organization: '2',
    certificate: '123',
    duration: ''
  },
  {
    key: '442',
    status: 'Đang tập sự',
    name: 'ALO',
    birthDate: '07/12/2001',
    internshipYear: '2024',
    idNumber: '123123123123',
    idIssueDate: '21/03/2024',
    organization: '2',
    certificate: '123',
    duration: ''
  },
];

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Tag color="yellow">
        {status}
      </Tag>
    ),
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: 'Năm Tập sự',
    dataIndex: 'internshipYear',
    key: 'internshipYear',
  },
  {
    title: 'Số CCCD',
    dataIndex: 'idNumber',
    key: 'idNumber',
  },
  {
    title: 'Ngày cấp CCCD',
    dataIndex: 'idIssueDate',
    key: 'idIssueDate',
  },
  {
    title: 'Tổ chức hành nghề',
    dataIndex: 'organization',
    key: 'organization',
  },
  {
    title: 'Chứng chỉ',
    dataIndex: 'certificate',
    key: 'certificate',
  },
  {
    title: 'Thời gian học kéo dài',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Button icon={<SettingOutlined />} />
    ),
  },
];

const MyTable = () => (
  <Table
    dataSource={dataSource}
    columns={columns}
    pagination={{ pageSize: 20, total: 446, showQuickJumper: true, showSizeChanger: true }}
    bordered
    title={() => 'Danh sách tập sự (446)'}
    footer={() => '© Your Company'}
  />
);

export default MyTable;