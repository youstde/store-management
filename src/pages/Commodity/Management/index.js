import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { Modal } from 'antd'
import { getComodityList } from '../services'

@connect(() => ({}))
class CommodityManagement extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getComodityList({
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
                    },
                })
            }
        })
    }

    // 查询表单搜索
    handleFormSearch = values => {
        const { pagination } = this.state

        this.setState(
            {
                searchCondition: values,
                pagination: {
                    ...pagination,
                    current: 1,
                },
            },
            () => {
                this.fetchData()
            }
        )
    }

    // 切换分页
    handleChangePage = page => {
        const { pagination } = this.state

        this.setState(
            {
                pagination: {
                    ...pagination,
                    current: page,
                },
            },
            () => {
                this.fetchData({
                    pageNum: page,
                })
            }
        )
    }

    onGenereteTail = () => {
        Modal.warn({
            title: '提示',
            content: '功能正在开发中，敬请期待',
        })
    }

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: 'sku品名/批次ID',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            options: [{ key: 0, value: '已下架' }, { key: 1, value: '已上架' }],
                            key: 'status',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '商品批次 id',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: 'sku id',
                            dataIndex: 'skuid',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'name',
                        },
                        {
                            title: '别名',
                            dataIndex: 'alias',
                        },
                        {
                            dataIndex: 'category_name',
                            title: '品类',
                        },
                        {
                            dataIndex: 'variety_name',
                            title: '品种',
                        },
                        {
                            dataIndex: 'region_name',
                            title: '产区',
                        },
                        {
                            dataIndex: 'storage_name',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'process_name',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'packing_name_a',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'packing_name_b',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'specification_real',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'weight_net',
                            title: '净重',
                        },
                        {
                            dataIndex: 'buy_date',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'price_settlement',
                            title: '门店结算价',
                        },
                        {
                            dataIndex: 'price_sale',
                            title: '门店售价',
                        },
                        {
                            dataIndex: 'stock_initial',
                            title: '入库库存',
                        },
                        {
                            dataIndex: 'stock_total',
                            title: '期初库存',
                        },
                        {
                            dataIndex: 'stock_count',
                            title: '期末库存',
                        },
                        {
                            dataIndex: 'stock_now',
                            title: '当前库存',
                        },
                        {
                            dataIndex: 'status_desc',
                            title: '上下架状态',
                            // render: v => (v === 0 ? '下架' : '上架'),
                        },
                        {
                            type: 'oprate',
                            // fixed: 'right',
                            buttons: [
                                {
                                    text: '售价/别名',
                                },
                                {
                                    text: '生成尾货',
                                    onClick: this.onGenereteTail,
                                },
                            ],
                        },
                    ]}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
            </PageHeaderWrapper>
        )
    }
}

export default CommodityManagement
