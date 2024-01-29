import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography } from '@mui/material';

class App extends React.Component {
  /*The initial input modeis set to text
  */
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */
 
  renderOutput = (input_mode)=>{
    let rows = 1
    let mode = "url"
    //If the input mode is text make it 4 lines
    if(input_mode === "text"){
      mode = "text"
      rows = 4
    }
      this.setState({innercomp:<textarea rows={rows} cols="50" id="textinput"/>,
      mode: mode,
      sentimentOutput:[],
      sentiment:true
      });
  } 
  
  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let url = ".";
    let mode = this.state.mode
    url = url+"/" + mode + "/sentiment?"+ mode + "="+document.getElementById("textinput").value;

    fetch(url).then((response)=>{
        response.json().then((data)=>{
        this.setState({sentimentOutput:data.label});
        let output = data.label;
        let color = "white"
        switch(output) {
          case "positive": color = "green";break;
          case "negative": color = "red";break;
          case "neutral": color = "yellow";break;
          default: color = "black";
        }
        output = <div style={{color:color,fontSize:20}}>{output}</div>
        this.setState({sentimentOutput:output});
      })});
  }

  sendForEmotionAnalysis = () => {

    this.setState({sentiment:false});
    let url = ".";
    let mode = this.state.mode
    url = url+"/" + mode + "/emotion?"+ mode + "="+document.getElementById("textinput").value;

    fetch(url).then((response)=>{
      response.json().then((data)=>{
      this.setState({sentimentOutput:<EmotionTable emotions={data}/>});
  })})  ;
  }
  

  render() {
    return (  
      <div className="App">
        <div style={{marginTop:"20px"}}>
            <Card style={{width:"50%", marginLeft:"400px", backgroundColor:"#fafafa"}} elevation={3}>
                <CardContent>
                    <Typography variant="h4">Welcome to Sentiment Analyze App</Typography>
                    <div style={{marginTop:"20px"}}>
                        <Typography style={{fontSize:"14px", color:"#212121",fontFamily:"Roboto"}}>Try to conduct sentiment analysis or emotions by choosing Text or URL</Typography>
                        <div style={{marginTop:"10px"}}>
                            <Button variant="contained" style={{backgroundColor:"#085696", }} onClick={()=>{this.renderOutput('text')}}>Text</Button>
                            <Button variant="contained" style={{marginLeft:"20px", backgroundColor:"#595959"}}  onClick={()=>{this.renderOutput('url')}}>URL</Button>
                        </div>
                    </div>
                        <br/><br/>
                        <Typography style={{fontFamily:"bold"}}>Before receiving the sentiment analysis or emotions, make sure to type the text or url</Typography>
                        {this.state.innercomp}
                        <br/>
                        <div style={{marginTop:"10px"}}>
                            <Button variant="contained" style={{backgroundColor:"#3D5E1C"}} onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</Button>
                            <Button variant="contained" style={{backgroundColor:"#2E662F",marginLeft:"20px"}} onClick={this.sendForEmotionAnalysis}>Analyze Emotion</Button>
                        </div>
                        <br/>
                        {this.state.sentimentOutput}
                    </CardContent>
            </Card>
        </div>
      </div>
    );
    }
}

export default App;
