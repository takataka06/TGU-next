export type Post = {
  id:string;
  title:string;
  content:string;
  published:boolean;
  createdAt:Date;
  author: {
    name:string;
  }
}

// PostCardProps は Reactコンポーネントの「引数の型」 を定義してる
export type PostCardProps = {
  post: Post;
}

//Reactコンポーネントの引数は「propsオブジェクト」だから、
// その型を分けておくのがTypeScript的には自然。