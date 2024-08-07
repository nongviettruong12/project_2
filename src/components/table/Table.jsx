import { useEffect, useState, useRef } from "react";
import {
  EllipsisOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FilterDropdown, ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Input, Modal, Tag, message } from "antd";
import { Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import "./table.css";
import ModalAdd from "../modal/Modal";

const MyTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const actionRef = useRef();
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0] || "");
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || ""}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0] || "");
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={String(text)}
        />
      ) : (
        text
      ),
  });

  
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      valueType: "indexBorder",
      width: 48,
      key: "id",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      hideInSearch: false,
      key: "status",
      valueType: "select",
      valueEnum:{
        intern:{text:'tập sự'},
        official:{text:'chính thức'}
      },
      render: (data, record) => (
        <Tag color={record.status === "intern" ? "gold" : "green"}>
          <span>{record.status === "intern" ? "tập sự" : "chính thức"}</span>
        </Tag>
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Tên là bắt buộc",
          },
        ],
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      valueType: "string",
      key: "fullName",
      hideInSearch: true,
      ...getColumnSearchProps("fullName"),
      render: (text, record) => String(record.fullName),
      formItemProps: {
        rules: [
          {
            required: true,
            message: "ưtf",
          },
        ],
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDay",
      valueType: "date",
      key: "birthDay",
      ellipsis: true,
      sorter: true,
      hideInSearch: false,

      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "Ngày tập sự",
      dataIndex: "probationDay",
      valueType: "date",
      sorter: false,
      hideInSearch: false,
      ellipsis: true,
      key: "probationDay",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "Năm tập sự",
      ...getColumnSearchProps("probationYear"),
      render: (text, record) => String(record.probationYear),
      dataIndex: "probationYear",
      valueType: "number",
      key: "probationYear",
      hideInSearch: true,
      sorter: (a, b) => a.probationYear - b.probationYear,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "Số CCCD",
      dataIndex: "identifyNumber",
      key: "identifyNumber",
      valueType: "number",
      sorter: true,
      hideInSearch: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "Ngày cấp CCCD",
      valueType: "date",
      key: "identifyDay",
      dataIndex: "identifyDay",
      // sorter: true,
      hideInSearch: false,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "Tổ chức hành nghề",
      dataIndex: "organization",
      hideInSearch: false,
      valueType: "select",
      valueEnum:{
        red:{text:'xã hội đỏ'},
        black:{text:'xã hội đen'}
      },
      render: (data, record) => (
        <Tag color={record.organization === "black" ? "black" : "red"}>
        <span>{record.organization === "black" ? "xã hội đen" : "xã hội đỏ"}</span>
      </Tag>
        )
    },
    {
      title: "Chứng chỉ",
      dataIndex: "certificate",
      key: "certificate",
      sorter: true,
      hideInSearch: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "thời gian học",
      dataIndex: "TimeOfLearning",
      key: "TimeOfLearning",
      valueType: "string",
      hideInSearch: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "hành động",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </>,
      ],
    },
  ];
  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
    setIsAdding(false);
    setInitialValues(record);
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: `Bạn có chắc muốn xoá?`,
      onOk: () => {
        setLoading(true);
        setDataSource((prev) => prev.filter((user) => user.id !== record.id));
        setLoading(false);
        message.success("xoa thanh cong");
      },
    });
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3000/user")
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          setDataSource(result);
          setLoading(false);
        });
    }, 2000);
  }, []);

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalVisible(true);
    setIsAdding(true);
    setInitialValues({});
  };

  return (
    <>
      <ProTable
        className="table_scroll"
        actionRef={actionRef}
        columns={columns}
        rowSelection={{
          selections: [MyTable.SELECTION_ALL, MyTable.SELECTION_INVERT],
        }}
        cardBordered
        dataSource={dataSource}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          defaultCollapsed: false, 
          labelWidth: "auto", 
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
              };
              
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        loading={loading}
        headerTitle="Danh sách tập sự"
        toolBarRender={() => [
          <Button
            key="reload"
            icon={<ReloadOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="default"
          >
            Làm mới
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {initialValues ? (
          <ModalAdd
            record={editingRecord}
            isAdding={isAdding}
            closeModal={() => setIsModalVisible(false)}
            initialValues={initialValues}
          />
        ) : null}
      </Modal>
    </>
  );
};
export default MyTable;
