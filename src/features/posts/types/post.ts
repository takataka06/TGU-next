export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  author: {
    name: string;
  };
  likedByMe: boolean;
  likeCount: number;
};

// PostCardProps は Reactコンポーネントの「引数の型」 を定義してる
// これをやらなければ{post}: {post: Post} のように毎回書く必要がある
export type PostCardProps = {
  post: Post;
};

//Reactコンポーネントの引数は「propsオブジェクト」だから、
// その型を分けておくのがTypeScript的には自然。
