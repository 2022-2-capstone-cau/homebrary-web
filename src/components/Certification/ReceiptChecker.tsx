import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import CloseBtnIcon from '@assets/close.svg';
import QuestionIcon from '@assets/question.svg';
import { selectedReceipt } from '@recoil/certificationState';

import * as S from './styles';

type ReceiptCheckerProps = {
  blobUrl: string;
};

const ReceiptChecker = ({ blobUrl }: ReceiptCheckerProps) => {
  const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false);
  const [receiptImage, setReceiptImage] = useState(blobUrl);
  const setReceipt = useSetRecoilState(selectedReceipt);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (!files?.length) return;

    const urlImage = URL.createObjectURL(files[0]);
    setReceipt(files[0]);
    setReceiptImage(urlImage);
  };

  const handleClickOnReselectReceipt = () => fileInputRef.current?.click();

  return (
    <S.ReceiptChecker>
      <S.TitleWrapper>
        <S.Title>
          <strong>사진</strong>이 잘 첨부되었나요?
        </S.Title>
        <S.ReselectBtn onClick={handleClickOnReselectReceipt}>다시 첨부하기</S.ReselectBtn>
        <S.FileInput
          onChange={handleOnChangeFileInput}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          // capture="camera"
        />
      </S.TitleWrapper>
      <S.ReceiptSection>
        {isToggleDialogOpen && (
          <S.ToggleDialogWrapper>
            <S.ToggleDescription>
              <p>
                <strong>날짜와 금액</strong>이 보여야
              </p>
              <p>정확한 인증이 진행되니 꼭 확인해주세요!</p>
            </S.ToggleDescription>
            <CloseBtnIcon onClick={() => setIsToggleDialogOpen(false)} />
          </S.ToggleDialogWrapper>
        )}
        <S.ReceiptImageWrapper>
          <Image src={receiptImage} alt="영수증 미리보기" fill />
          <QuestionIcon onClick={() => setIsToggleDialogOpen((prev) => !prev)} />
        </S.ReceiptImageWrapper>
      </S.ReceiptSection>
    </S.ReceiptChecker>
  );
};

export default ReceiptChecker;
