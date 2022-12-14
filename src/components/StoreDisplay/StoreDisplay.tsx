import Image from 'next/image';
import Link from 'next/link';

import { Omakases } from '@recoil/omakaseState';

import * as S from './styles';
import { DEFAULT_IMAGE_URL } from '@constants/omakase';

const StoreDisplay = ({ id, image_url, level, county, name, address }: Omakases) => {
  return (
    <S.StoreDisplay>
      <Link href={`/search/${id}`} passHref>
        <S.StoreImageWrapper>
          <S.SubTitles>
            <span>#{level}</span>
            <span>#{county}</span>
          </S.SubTitles>

          <Image
            src={image_url ? `${process.env.API_ENDPOINT}${image_url}` : DEFAULT_IMAGE_URL}
            alt="매장 이미지 미리보기"
            fill
          />

          <S.StoreDescriptionWrapper>
            <h1 className="store-title">{name}</h1>
            <p className="store-location">{address}</p>
          </S.StoreDescriptionWrapper>
        </S.StoreImageWrapper>
      </Link>
    </S.StoreDisplay>
  );
};

export default StoreDisplay;
