/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import Card from '../common/Card'
import Form from '../common/Form'
import Input from '../common/Input'
import Button from '../common/Button'
import $ from 'jquery'
import 'cropper'
import Modal from '../common/Modal'
import '../common/util/date'
<<<<<<< HEAD
import getObjectURL from '../common/util/getObjectUrl'
const FromItem = Form.Item
=======
import getObjectUrl from '../common/util/getObjectUrl'
//import TinyMCEInput from '../common/util/TinyMCEInput'
const FromItem = Form.Item

>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      id: this.props.params.id,
      readOnly: this.props.params.type != 'edit',
      loading: false,
      article: {columnId: 1},
<<<<<<< HEAD
      columns: []
=======
      columns: [],
      targetImg: "",
      cropping:false,
    validateError:false
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
    }
  }

  componentWillMount() {
    this.queryArticleById(this.state.id);
    this.queryColumnList();
  }

  queryColumnList() {
    $.ajax({
      type: 'GET',
      url: `/nczl-web/rs/column/select`,
      dataType: 'json',
      success: function (rm) {
        if (rm.code == 1) {
          console.log('debug', rm.result);
          this.setState({
            columns: rm.result
          })
        }
      }.bind(this)
    })
  }

  queryArticleById(id) {
    if (this.state.id == 'new') {
      this.setState({article: {columnId: 1}})
    } else {
      this.setState({loading: true})

      $.ajax({
        type: 'GET',
        url: `/nczl-web/rs/article/detail?id=${id}`,
        dataType: 'json',
        success: function (rm) {
          if (rm.code == 1) {
            console.log('debug', rm.result);
            var article = rm.result
            article.content = article.contents;
            this.setState({
              article: article,
              loading: false,
              id: article.id
            })
          }
        }.bind(this)
      })
    }
  }

  handleFileChange(e) {
    e.preventDefault();
<<<<<<< HEAD
    console.log("debug target", e.target)
    var file = e.target.files[0];
    var targetImg = e.target.getAttribute("data-target");

    if (!file) {
      console.log("未选择图片")
    }
    else {
      var objUrl = getObjectURL(file);
      if (objUrl) {
        var options = {
          aspectRatio: targetImg != "titleImg" ? 64 / 35 : 4 / 3,
          autoCropArea: 0.7,
          strict: true,
          //guides: false,
          center: true,
          highlight: false,
          //dragCrop: false,
          //cropBoxMovable: false,
          //cropBoxResizable: false,
          zoom: -0.2,
          checkImageOrigin: true,
          background: false,
          minContainerHeight: 400,
          minContainerWidth: 300
        }
        $("#img-container").html('<img  style="width: 100%;height:100%">');
        $("#img-container img").attr("src", objUrl);
        $("#img-container img").cropper(options);
        this.openModal();
        this.setState({targetImg: targetImg});
      }
=======
    var targetImg = e.target.getAttribute("data-target")
    var file = e.target.files[0];
    if (file) {
      var objUrl = getObjectUrl(file)

      this.openModal()
      console.log("targetImg", targetImg)
      var options = {
        aspectRatio: targetImg != "titleImg" ? 64 / 35 : 4 / 3,
        autoCropArea: 0.7,
        strict: true,
        //guides: false,
        center: true,
        highlight: false,
        //dragCrop: false,
        //cropBoxMovable: false,
        //cropBoxResizable: false,
        zoom: -0.2,
        checkImageOrigin: true,
        background: false,
        minContainerHeight: 400,
        minContainerWidth: 300
      }
      console.log("aspectRatio", options.aspectRatio)
      $("#img-container").html('<img  style="width: 100%;height:100%">');
      $('#img-container > img').attr("src", objUrl)
      $("#img-container img").cropper(options);
      this.setState({targetImg: targetImg,cropping:true})
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
    }

  }

  handleCrop(e) {
    var size = {
      width: 640,
      height: 350
    }
    if (this.state.targetImg == "titleImg") {
      size.width = 200;
      size.height = 150
    }
    console.log("Size",size)
    e.preventDefault();

    var $image = $('#img-container > img');
    var dataURL = $image.cropper("getCroppedCanvas", size);
    var imgurl = dataURL.toDataURL("image/png", 0.5).replace(/^data:image\/(png|jpg);base64,/, '');
    //$("#titleImg").attr("src", imgurl);

    $.ajax({
      type: 'POST',
      url:  `/nczl-web/rs/common/uploadImgOfBase64`,
      dataType: 'json',
      data:{'file':imgurl,'extname':'png'},//{'a':'b'},
      //processData: false,
      //contentType: false,
      //contentType:'multipart/form-data',
      success: function (rm) {
        if (rm.code == 1) {
          //console.log("debug",this.state)
         var {article,targetImg}=this.state;
          article[targetImg]=rm.data;
         this.setState({
           article:article
         })
          console.log('成功', );
         }
        console.log('debug', rm);
      }.bind(this)
    })

    this.closeModal();
    this.setState({cropping:false});
  }

<<<<<<< HEAD
=======

>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
  handleFieldChange(e) {
    const name = e.target.name;
    var article = this.state.article
    article[name] = e.target.value;
<<<<<<< HEAD
=======

>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
    if (name == 'summary') {
      article[name] = e.target.value.substr(0, 50);
    }
    if (name == 'contents') {
      article['content'] = article[name]
    }
    this.setState({
      article: article
    })
    console.log("handleFieldChange", e.target.value, "--", article)
  }

  openModal() {
    this.setState({modalVisible: true})
  }

  closeModal() {
<<<<<<< HEAD
    this.setState({modalVisible: false})
=======
    this.setState({modalVisible: false,modalMsg:null,validateError:false})
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
  }

  handleOk(e) {
    e.preventDefault();
    this.closeModal();
    this.props.actions.goBack();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.readOnly) {
      this.setState({
        readOnly: false
      })
    }
    else {
      this.handleEditArticle()
    }
  }

  handleEditArticle() {
    const method = this.state.id == 'new' ? 'add' : 'edit';
<<<<<<< HEAD
    console.log("handleEditArticle m", method)
    var data = new FormData($('#form')[0]);
=======
    var content = tinymce.get('contents').getContent();
    console.log("content", content);
    console.log("handleEditArticle m", method)
    //var data = new FormData($('#form')[0]);
    this.state.article.content=content;
    //validate
    if(!this.state.article.title){
      this.setState({
        modalMsg: "标题不能为空，请重新填写",
        modalVisible:true,
        validateError:true
      })
      return
    }
    if(!this.state.article.content){
      this.setState({
        modalMsg: "正文不能为空，请重新填写",
        modalVisible:true,
        validateError:true
      })
      return
    }
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
    $.ajax({
      type: 'POST',
      url: `/nczl-web/rs/article/${method}`,
      dataType: 'json',
      data: this.state.article,
      success: function (rm) {
        if (rm.code == 1) {
          console.log('debug', rm.result);

          this.setState({
            modalMsg: "操作成功"
          })
        } else {
          this.setState({
            modalMsg: "错误：" + rm.message
          })
        }
        this.openModal()
      }.bind(this)
    })
  }

<<<<<<< HEAD
  handleCrop(e) {
    e.preventDefault();
    var targetImg = this.state.targetImg;
    var size = {
      width: 640,
      height: 350
    }
    if (targetImg == "titleImg") {
      size.width = 200;
      size.height = 150;
    }

    this.closeModal();
    var $image = $('#img-container > img');
    var dataURL = $image.cropper("getCroppedCanvas", size);
    var imgurl = dataURL.toDataURL("image/jpeg", 0.5);
    $("#" + targetImg).attr("src", imgurl);
  }

  handleTest(e) {
    e.preventDefault();


  }
=======
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c

  handleReturn(e) {
    e.preventDefault();

    this.props.actions.goBack();
  }

  renderForm() {
<<<<<<< HEAD
    const {readOnly, article}=this.state;
=======
    const {readOnly, article,cropping}=this.state;
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
    var status;
    switch (article.status) {
      case 0:
        status = '已停止';
        break;
      case 1:
        status = '已发布';
        break;
      default:
        status = 'unknown';
    }
    var columnSelect = this.state.columns.map((column)=> {
      return <option key={column.id} value={column.id}>{column.columnName}</option>
    })
    columnSelect = <select value={this.state.id == 'new' ? 1 : article.columnId} name="columnId"
                           onChange={this.handleFieldChange.bind(this)}>{columnSelect}</select>
    var readOnlyContents = null;
    if (readOnly) {
      readOnlyContents = [
        <FromItem label="发布时间：" key="time">{new Date(article.createtime).Format("yyyy-MM-dd")}</FromItem>,
        <FromItem label="总浏览量：" key="pageviews"><a href="#">{article.pageviews}</a></FromItem>,
        <FromItem label="评论数：" key="comments">{article.comments}</FromItem>
      ]
    }
    return (
      <Form ref="form" id="form" onSubmit={this.handleSubmit.bind(this)}>
        <FromItem label="标题：" required={!readOnly}>
          {readOnly ? article.title :
            <Input size="60" value={article.title} name="title" onChange={this.handleFieldChange.bind(this)}/>}
        </FromItem>
        <FromItem label="作者&身份：" required={!readOnly}>
          {readOnly ? article.author :
            <Input size="20" value={article.author} name="author" onChange={this.handleFieldChange.bind(this)}/>}
        </FromItem>
        <FromItem label="所属分类：" required={!readOnly}>
          {readOnly ? article.columnName : columnSelect}
        </FromItem>
        <FromItem label="状态：">
          {readOnly ? status :
            <select value={article.status} name="status" onChange={this.handleFieldChange.bind(this)}>
              <option value={1}>马上发布</option>
              <option value={0}>停止</option>
            </select>}
        </FromItem>
        <FromItem label="置顶：">
          {readOnly ? (article.stick ? '是' : '否') :
            <select value={article.stick} name="stick" onChange={this.handleFieldChange.bind(this)}>
              <option value={0}>否</option>
              <option value={1}>是</option>
            </select>
          }
        </FromItem>
        {article.stick == 1 ?
<<<<<<< HEAD
          <FromItem label="置顶标题图：" required={!readOnly} help="上传尺寸：640px*350px，图片格式仅限为：jpg、gif、png，文件大小为500KB以内。">
            <div><img id="stickImg" src={article.stickImg}/></div>
            {readOnly ? null : <span><Input ref="stickImgSrc" type="file" size="40" data-target="stickImg"
                                            onChange={this.handleFileChange.bind(this)}/></span>}
          </FromItem> : null}
        <FromItem label="文章标题缩略图：" required={!readOnly} help="上传尺寸：200px*150px，图片格式仅限为：jpg、gif、png，文件大小为200KB以内。">
          <div><img id="titleImg" src={article.titleImg}/></div>
          {readOnly ? null : <span><Input ref="titleImgSrc" type="file" size="40" data-target="titleImg"
=======
          <FromItem label="置顶标题图：" required={!readOnly} help={readOnly?null:"上传尺寸：640px*350px，图片格式仅限为：jpg、gif、png，文件大小为500KB以内。"}>
            <div><img id="stickImg" src={article.stickImg}/></div>
            {readOnly ? null : <span><Input ref="stickImgSrc" data-target="stickImg" type="file" size="40"
                                            onChange={this.handleFileChange.bind(this)}/></span>}
          </FromItem> : null}
        <FromItem label="文章标题缩略图：" required={!readOnly} help={readOnly?null:"上传尺寸：200px*150px，图片格式仅限为：jpg、gif、png，文件大小为200KB以内。"}>
          <div><img id="titleImg" src={article.titleImg}/></div>
          {readOnly ? null : <span><Input ref="titleImgSrc" data-target="titleImg" type="file" size="40"
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
                                          onChange={this.handleFileChange.bind(this)}/></span>}
        </FromItem>
        {readOnlyContents}
        <FromItem label="摘要：" required={!readOnly}>
          {readOnly ? article.summary : <span>
                  <Input type="textarea" cols="90" rows="5" value={article.summary} name="summary"
                         onChange={this.handleFieldChange.bind(this)}/>
                <br />
                  字数上限：50</span>}

        </FromItem>
        <FromItem label="正文：" required={!readOnly}>
<<<<<<< HEAD
          {readOnly ? article.contents :
            <Input type="textarea" cols="90" rows="5" value={article.contents} name="contents"
                   onChange={this.handleFieldChange.bind(this)}/>}
=======
          {readOnly ? <Input key="read" id="contents" type="textarea" cols="90" rows="5" value={article.contents} name="contents" tinymce
                             readOnly/> :
            <Input key="write" id="contents" type="textarea" cols="90" rows="5" value={article.contents} name="contents" tinymce
                   />/*去掉了onCHange  有tinymce 没啥用*/}
          {/*<TinyMCEInput tinymceConfig={TINYMCE_CONFIG}></TinyMCEInput>*/}
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c

        </FromItem>
        <FromItem>
          <Button prefixCls="btn_4" onClick={this.handleSubmit.bind(this)} style={{margin: "3px"}}>编辑信息</Button>
          <Button prefixCls="btn_4" onClick={this.handleReturn.bind(this)} style={{margin: "3px"}}>返回</Button>
        </FromItem>
      </Form>
    )
  }

  render() {
<<<<<<< HEAD
    const {readOnly, loading}=this.state;
=======
    const {readOnly, loading,cropping,validateError}=this.state;
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c

    //console.log(this.props.params.type,this.props.params.id);
    return (
      <Card ref="card" title={<span>{readOnly ? '文章详细' : '文章编辑'}</span>}>
        {loading ? '加载中' : this.renderForm()}

<<<<<<< HEAD
        <button onClick={this.handleTest.bind(this)}>click</button>
        <Modal title="信息" visible={this.state.modalVisible} closable={false}
               onOk={this.handleOk.bind(this)}
        >{this.state.modalMsg}
          <div id="img-container" style={{maxHeight: "500px"}}>
            <img src="../../images/head1.jpg" style={{width: "280px", height: "280px"}}/>
          </div>
          <button className="btn" id='confirmBtn' onClick={this.handleCrop.bind(this)}>222</button>
=======
        <Modal title={cropping?"图片裁剪":"信息"} visible={this.state.modalVisible} closable={true} onClose={this.closeModal.bind(this)}
               onOk={cropping?this.handleCrop.bind(this):(validateError?this.closeModal.bind(this):this.handleOk.bind(this))}
        >{this.state.modalMsg}
          <div className={cropping?null:"hide"} id="img-container" style={{maxHeight: "500px"}}>
            <img src="../../images/head1.jpg" style={{width: "280px", height: "280px"}}/>
          </div>
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
        </Modal>

        {this.props.children}
      </Card>
    )
  }
}
export default ArticleDetail;
