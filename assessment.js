'use strict'
const userNameInput = document.getElementById("user-name")
const assessmentButton = document.getElementById("assessment")
const resultDivided = document.getElementById("result-area")
const tweetDivided = document.getElementById("tweet-area")


/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){//result-areaに何かタグがあるに限りループ
        element.removeChild(element.firstChild);   
 }
}
/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} element HTMLの要素
 */
function appendAssessmentResult(element,result){
const h3 =document.createElement('h3');//H3タグを作る
h3.innerText = '診断結果';//h3タグに’診断結果の文字列を設定
element.appendChild(h3);//リザルトエリアに文字列を設定

const p  = document.createElement('p');
p.innerText = result;
element.appendChild(p);
}

assessmentButton.onclick = ()　=> {
let userName = userNameInput.value;　
//名前の入力がなかったので中断
if(!userName){
    return;
}
removeAllChildren(resultDivided);
const result = assessment(userName)
appendAssessmentResult(resultDivided,result);

removeAllChildren(tweetDivided);
//aタグを作って属性を追加する
const a = document.createElement('a');
const href = 'https://twitter.com/intent/tweet?button_hashtag='
+'あなたのいいところ'
+'&ref_src=twsrc%5Etfw';
a.setAttribute('href',href);
a.className = 'twitter-hashtag-button';
a.setAttribute('data-text',result);
a.innerText ='Tweet #あなたのいいところ';

//aタグをHTMLとしてついかする
tweetDivided.appendChild(a);

//scriptタグを作る
const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

tweetDivided.appendChild(script);

}
//入力蘭でエンターキーを押したとき実行する
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
      // TODO ボタンのonclick() 処理を呼び出す
    }

  };


const answers =[
    '{userName}のいいところは声です。{userNam e}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userNamet}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    ];

    /**
     * 名前の文字を渡すと診断結果を返す関数
     * @param {string} userName 名前
     * @return {string}診断診断結果
     * 
     */
    function assessment(userName) {
        //userName(文字列)を数値（漢字だと５桁）に変換
        var userNameNumber = 0
        for(let i = 0; i < userName.length; i++){
            userNameNumber += userName.charCodeAt(i);
            //全ての文字を足し算する
        }
    //５桁の数字を回答結果の範囲（0から15に変換）
    var answerNunber = userNameNumber % answers.length;
//診断結果
    var result = answers[answerNunber];
    return result.replace(/\{userName\}/g, userName)

}
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
