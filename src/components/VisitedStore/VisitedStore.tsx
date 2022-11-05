import { DEFAULT_IMAGE_URL } from '@constants/omakase';
import Image from 'next/image';
import Link from 'next/link';

import * as S from './styles';

export interface VisitedStoreProps {
  id: number;
  name: string;
  image: string;
  date?: string;
}

const VisitedStore = ({ id, name, image, date }: VisitedStoreProps) => {
  return (
    <S.StoreDisplay>
      <Link href={`/search/${id}`} passHref>
        <S.StoreImageWrapper>
          <Image
            src={image ? `${process.env.API_ENDPOINT}${image}` : DEFAULT_IMAGE_URL}
            alt="매장 이미지 미리보기"
            fill
          />
        </S.StoreImageWrapper>
        <S.StoreDescriptionWrapper>
          <h1 className="store-title">{name}</h1>
          {date && <pre className="store-desc">{date}</pre>}
        </S.StoreDescriptionWrapper>
      </Link>
    </S.StoreDisplay>
  );
};

export default VisitedStore;
