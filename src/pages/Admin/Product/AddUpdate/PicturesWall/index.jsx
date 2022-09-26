import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {message, Modal, Upload} from "antd";
import {reqDeleteImage} from "../../../../../api";
import {BASE_IMG_URL} from '../../../../../utils/constants';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

// 照片上传组件
const PicturesWall = forwardRef((props, ref) => {
    // 是否显示大图
    const [previewOpen, setPreviewOpen] = useState(false);
    // 大图的地址
    const [previewImage, setPreviewImage] = useState('');
    // 上传的图片集合
    const [fileList, setFileList] = useState([]);
    // 获取图片
    const {imgs} = props

    // ref传父组件
    useImperativeHandle(ref, () => ({
        // getImages 就是暴露给父组件的方法
        // 获取图片的name
        getImages: () => {
            return fileList.map((file) => file.name)
        }
    }))

    // 如果有图片信息imgs
    useEffect(() => {
        if (imgs && imgs.length > 0) {
            setFileList(imgs.map((img, index) => ({
                uid: -index,      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
                name: img,   // 文件名
                status: 'done', // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
                url: BASE_IMG_URL + img // 请求的图片地址
            })))
        }
    },[imgs])

    // 关闭图片的大图显示
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // file 当前操作的文件对象。
    // fileList 当前的文件列表。
    const handleChange = ({ fileList: newFileList, file }) => {
        // 图片上传成功后，将当前图片信息修改为后端修改后保存的数据
        if (file.status === 'done') {
            const {status, data:{name, url}} = file.response
            if ( status === 0 ) {
                message.success('上传成功')
                file.name = name
                file.url = url
            } else {
                message.success('上传失败')
            }
            // 删除图片
        } else if (file.status === 'removed') {
            reqDeleteImage(file.name).then((response) => {
                const {status} = response.data
                if (status === 0) {
                    message.success('删除成功')
                } else {
                    message.success('删除失败')
                }
            })
        }
        // 上传/删除图片更新图片数组的状态
        setFileList(newFileList)
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <div>
            <Upload
                action='/api/manage/img/upload' // 	上传的地址
                accept='image/*' // 接受上传的文件类型(图片)
                listType="picture-card"
                name='image' // 发到后台的文件参数名
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewOpen} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
})

export default PicturesWall;