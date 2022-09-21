function dbQryBtn(){
    var dbQryBtn = document.getElementById("dbQry");
    if(dbQryBtn.value=="yes"){
        dbQryBtn.value="no";
        dbQryBtn.style.backgroundColor="green";
        dbQryBtn.onmouseover = function()
        {
            this.style.backgroundColor = "darkgreen";
        }
        dbQryBtn.onmouseleave = function(){
            this.style.backgroundColor ="green";
        }
    }else if(dbQryBtn.value=="no"){
        dbQryBtn.value="yes";
        dbQryBtn.style.backgroundColor='rgba(22, 85, 167,1)';
        dbQryBtn.onmouseover = function(){
            this.style.backgroundColor = "rgb(0, 60, 136,1)";
        }
        dbQryBtn.onmouseleave = function(){
            this.style.backgroundColor ="rgba(22, 85, 167, 1)";
        }
    }
}
function spQryBtn(){
    var spQryBtn = document.getElementById("spQry");
    if(spQryBtn.value=="yes"){
        spQryBtn.value="no";
        spQryBtn.style.backgroundColor="green";
        spQryBtn.onmouseover = function()
        {
            this.style.backgroundColor = "darkgreen";
        }
        spQryBtn.onmouseleave = function(){
        this.style.backgroundColor ="green";
    }
}else if(spQryBtn.value=="no"){
        spQryBtn.value="yes";
        spQryBtn.style.backgroundColor='rgba(22, 85, 167,1)';
        spQryBtn.onmouseover = function(){
            this.style.backgroundColor = "rgb(0, 60, 136,1)";
        }
        spQryBtn.onmouseleave = function(){
            this.style.backgroundColor ="rgba(22, 85, 167, 1)";
        }
    }
}
function AnsimBtn(){
    var AnsimBtn = document.getElementById("Ansim");
    var AnsimLayer = document.getElementById("AnsimLayer")
    if(AnsimBtn.value=="yes"){
        AnsimBtn.value="no";
        AnsimLayer.style.visibility='visible';
        AnsimBtn.style.backgroundColor="green";
        AnsimBtn.onmouseover = function()
        {
            this.style.backgroundColor = "darkgreen";
        }
        AnsimBtn.onmouseleave = function(){
            this.style.backgroundColor ="green";
        }
    }else if(AnsimBtn.value=="no"){
        AnsimBtn.value="yes";
        AnsimLayer.style.visibility='hidden';
        AnsimBtn.style.backgroundColor='rgba(22, 85, 167,1)';
        AnsimBtn.onmouseover = function(){
            this.style.backgroundColor = "rgb(0, 60, 136,1)";
        }
        AnsimBtn.onmouseleave = function(){
            this.style.backgroundColor ="rgba(22, 85, 167, 1)";
        }
    }
}
function warningBtn(){
    var t = document.getElementById("warning");
    var x = document.getElementById("warningLegendOpen")
    var s = document.getElementById("warningLegendContainer")
    var a = document.getElementById("warningLegend")
  if(t.value=="yes"){
      t.value="no";
      t.style.backgroundColor="green";
      t.onmouseover = function()
      {
          this.style.backgroundColor = "darkgreen";
      }
      t.onmouseleave = function(){
        this.style.backgroundColor ="green";
      }
      x.style.visibility = 'visible';
      map.addLayer(warning);
      warning.setVisible(true);
      x.innerHTML="&nbsp;&nbsp;범례 닫기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲";
      s.style.visibility = 'visible'
      a.style.visibility = 'visible'
      x.style.width='140px';
    }
  else if(t.value=="no"){
      t.value="yes";
      t.style.backgroundColor='rgba(22, 85, 167,1)';
      t.onmouseover = function(){
          this.style.backgroundColor = "rgb(0, 60, 136,1)";
      }
      t.onmouseleave = function(){
        this.style.backgroundColor ="rgba(22, 85, 167, 1)";
      }
      x.style.visibility = 'hidden';
      map.removeLayer(warning);
      warning.setVisible(false);
      s.style.visibility = 'hidden';
      a.style.visibility = 'hidden';
    }
}

function warningLegendOpen(){
    var t = document.getElementById("warningLegendOpen");
    var s = document.getElementById("warningLegendContainer")
    var x = document.getElementById("warningLegend");
    if(t.value=="yes"){
        t.value="no";
        t.innerHTML="&nbsp;범례&nbsp;&nbsp;▼";
        x.style.visibility = 'hidden';
        s.style.visibility = 'hidden';
        t.style.width="57px";
    } else if(t.value=="no"){
        t.value="yes";
        t.innerHTML="&nbsp;&nbsp;범례 닫기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲";
        x.style.visibility = 'visible';
        s.style.visibility = 'visible'
        t.style.width="140px";
    }
}

function levelBtn(){
    var t = document.getElementById("level");
    var a = document.getElementById("levelLegendOpen");
    var b = document.getElementById("levelLegendContainer");
    var x = document.getElementById("levelLegend");
    var s = document.getElementById("levelLayer");
  if(t.value=="yes"){
      t.value="no";
      t.style.backgroundColor="green";
      s.style.visibility='visible';
      t.onmouseover = function(){
        this.style.backgroundColor = "darkgreen";
      }
      t.onmouseleave = function(){
        this.style.backgroundColor ="green";
      }
      a.innerHTML="&nbsp;&nbsp;범례 닫기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲";
      a.style.visibility='visible';
      b.style.visibility='visible';
      x.style.visibility = 'visible';
      a.style.width='140px';
    }
  else if(t.value=="no"){
      t.value="yes";
      t.style.backgroundColor='rgba(22, 85, 167,1)';
      s.style.visibility='hidden'
      t.onmouseover = function(){
        this.style.backgroundColor = "rgb(0, 60, 136,1)";
      }
      t.onmouseleave = function(){
        this.style.backgroundColor ="rgba(22, 85, 167, 0.6)";
      }
      a.style.visibility = 'hidden';
      b.style.visibility = 'hidden';
      x.style.visibility = 'hidden';
    }
}

function levelLegendOpen(){
    var t = document.getElementById("levelLegendOpen");
    var s = document.getElementById("levelLegendContainer")
    var x = document.getElementById("levelLegend");
    if(t.value=="yes"){
        t.value="no";
        t.innerHTML="&nbsp;범례&nbsp;&nbsp;▼";;
        x.style.visibility = 'hidden';
        s.style.visibility = 'hidden';
        t.style.width="57px";
    } else if(t.value=="no"){
        t.value="yes";
        t.innerHTML="&nbsp;&nbsp;범례 닫기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲";
        x.style.visibility = 'visible';
        s.style.visibility = 'visible'
        t.style.width="140px";
    }
}