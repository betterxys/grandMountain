import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Volume2 } from 'lucide-react';
import HanziWriter from 'hanzi-writer';
import { hanziData } from '../data/hanziData';

interface CharacterDetailProps {}

const CharacterDetail: React.FC<CharacterDetailProps> = () => {
  const { char } = useParams<{ char: string }>();
  const [characterInfo, setCharacterInfo] = useState<typeof hanziData[string] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (char && char in hanziData) {
      setCharacterInfo(hanziData[char]);
    } else {
      setError('未找到该汉字的信息');
    }
  }, [char]);

  useEffect(() => {
    if (char && characterRef.current) {
      const writer = HanziWriter.create(characterRef.current, char, {
        width: 200,
        height: 200,
        padding: 5,
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 500,
      });

      writer.loopCharacterAnimation();
    }
  }, [char]);

  const handleSpeak = () => {
    if (char) {
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.lang = 'zh-CN';
      speechSynthesis.speak(utterance);
    }
  };

  if (!char) return null;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
      <Link to="/" className="flex items-center text-blue-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="w-6 h-6 mr-2" />
        <span className="text-lg">返回</span>
      </Link>
      <h2 className="text-3xl font-bold mb-6">汉字详情</h2>
      {error ? (
        <p className="text-xl text-red-500">{error}</p>
      ) : characterInfo ? (
        <>
          <div className="mb-6 flex items-center">
            <span className="text-8xl font-bold mr-4">{char}</span>
            <button onClick={handleSpeak} className="text-blue-500 hover:text-blue-600">
              <Volume2 className="w-10 h-10" />
            </button>
          </div>
          <p className="text-xl mb-4"><strong className="font-semibold">拼音：</strong>{characterInfo.pinyin}</p>
          <p className="text-xl mb-4"><strong className="font-semibold">笔画：</strong>{characterInfo.strokes}</p>
          <p className="text-xl mb-6"><strong className="font-semibold">解释：</strong>{characterInfo.definition}</p>
          <div className="mb-6">
            <strong className="text-xl font-semibold">笔顺：</strong>
            <div ref={characterRef} className="mt-4 w-[200px] h-[200px]"></div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CharacterDetail;