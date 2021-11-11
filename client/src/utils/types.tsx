export interface GnbProps {
  type?: string;
  rightModalType?: string;
}

export interface FlexProps {
  center?: boolean;
}

export interface TabProps {
  current?: boolean;
}

export interface IconProps {
  img: any;
}

export interface RightModalProps {
  [key: string]: boolean;
  rightModalFlag: boolean;
  messageFlag: boolean;
  alarmFlag: boolean;
  selectorFlag: boolean;
}

export interface Message {
  message?: string;
}
export interface SearchedUser {
  idx: number;
  nickname: string;
  profile: string;
}

export interface SearchedUserProps {
  user: SearchedUser;
}

export interface ProfilePhotoProps {
  src?: string;
  size?: string;
}

export interface SideBarProps {
  isLeft: boolean;
  children: React.ReactNode;
}

export interface PostBody {
  contents: string;
  picture1: string | null;
  picture2: string | null;
  picture3: string | null;
}

export interface PostUpdateData extends PostBody {
  secret: boolean;
}

export interface PostAddData extends PostUpdateData {
  useridx: number;
  likenum: number;
}

export interface PostData extends PostAddData {
  idx: number;
  createdAt: Date;
  BTUseruseridx: {
    bio: string | null;
    idx: number;
    nickname: string;
    profile: string | null;
  };
  likeFlag: boolean;
}

export interface PostProps {
  post: PostData;
}

export interface PostHeaderProps {
  nickname: string;
  profile: string | null;
  createdAt: Date;
  secret: boolean;
}

export interface PostFooterProps {
  likenum: number;
}

export interface PostImageInfo {
  url: string;
  originalWidth: number;
  originalHeight: number;
}

export interface PostImageBoxProps {
  imageCount: number;
  images: PostImageInfo[] | null;
}

export interface PostImageBoxStyle {
  width: number;
  height: number;
  leftBorder?: boolean;
  rightBorder?: boolean;
  topBorder?: boolean;
  bottomBorder?: boolean;
}

export interface PostImageBoxStyleWithSource extends PostImageBoxStyle {
  index: number;
  urls: string[];
}

export interface ImgUploadModalProps {
  modalState: boolean;
  writerModalState: boolean;
}
