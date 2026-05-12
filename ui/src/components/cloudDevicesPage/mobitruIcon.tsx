/*
 * Copyright 2026 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useId } from 'react';

interface MobitruIconProps {
  className?: string;
}

const MobitruIcon = ({ className = '' }: MobitruIconProps) => {
  const uid = useId().replace(/:/g, '');
  const gid = (n: number) => `${uid}-mobitru-g${n}`;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="185"
      height="39"
      viewBox="0 0 185 39"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M114.373 5.70502C113.209 5.70502 112.265 6.6514 112.265 7.81884C112.265 8.98627 113.209 9.93266 114.373 9.93266C115.538 9.93266 116.482 8.98627 116.482 7.81884C116.482 6.6514 115.538 5.70502 114.373 5.70502Z"
        fill={`url(#${gid(0)})`}
      />
      <path
        d="M114.373 5.70502C113.209 5.70502 112.265 6.6514 112.265 7.81884C112.265 8.98627 113.209 9.93266 114.373 9.93266C115.538 9.93266 116.482 8.98627 116.482 7.81884C116.482 6.6514 115.538 5.70502 114.373 5.70502Z"
        fill={`url(#${gid(1)})`}
      />
      <path
        d="M114.373 12.575C113.209 12.575 112.265 13.5213 112.265 14.6888V23.144C112.265 26.9382 115.333 30.0139 119.116 30.0139H121.225C122.389 30.0139 123.333 29.0676 123.333 27.9001C123.333 26.7327 122.389 25.7863 121.225 25.7863H119.644C117.897 25.7863 116.482 24.3667 116.482 22.6155V14.6888C116.482 13.5213 115.538 12.575 114.373 12.575Z"
        fill={`url(#${gid(2)})`}
      />
      <path
        d="M114.373 12.575C113.209 12.575 112.265 13.5213 112.265 14.6888V23.144C112.265 26.9382 115.333 30.0139 119.116 30.0139H121.225C122.389 30.0139 123.333 29.0676 123.333 27.9001C123.333 26.7327 122.389 25.7863 121.225 25.7863H119.644C117.897 25.7863 116.482 24.3667 116.482 22.6155V14.6888C116.482 13.5213 115.538 12.575 114.373 12.575Z"
        fill={`url(#${gid(3)})`}
      />
      <path
        d="M45.8546 12.575C42.3615 12.575 39.5298 15.4141 39.5298 18.9164V27.9001C39.5298 29.0676 40.4737 30.0139 41.638 30.0139C42.8024 30.0139 43.7463 29.0676 43.7463 27.9001V19.9733C43.7463 18.2222 45.1621 16.8026 46.9087 16.8026H49.017C49.5992 16.8026 50.0711 17.2758 50.0711 17.8595V25.7863C50.0711 26.9538 51.015 27.9001 52.1793 27.9001C53.3437 27.9001 54.2877 26.9538 54.2877 25.7863V17.8595C54.2877 17.2758 54.7596 16.8026 55.3418 16.8026H56.9229C58.6695 16.8026 60.0854 18.2222 60.0854 19.9733V27.9001C60.0854 29.0676 61.0292 30.0139 62.1936 30.0139C63.358 30.0139 64.3019 29.0676 64.3019 27.9001V18.9164C64.3019 15.4141 61.4701 12.575 57.977 12.575H45.8546Z"
        fill={`url(#${gid(4)})`}
      />
      <path
        d="M45.8546 12.575C42.3615 12.575 39.5298 15.4141 39.5298 18.9164V27.9001C39.5298 29.0676 40.4737 30.0139 41.638 30.0139C42.8024 30.0139 43.7463 29.0676 43.7463 27.9001V19.9733C43.7463 18.2222 45.1621 16.8026 46.9087 16.8026H49.017C49.5992 16.8026 50.0711 17.2758 50.0711 17.8595V25.7863C50.0711 26.9538 51.015 27.9001 52.1793 27.9001C53.3437 27.9001 54.2877 26.9538 54.2877 25.7863V17.8595C54.2877 17.2758 54.7596 16.8026 55.3418 16.8026H56.9229C58.6695 16.8026 60.0854 18.2222 60.0854 19.9733V27.9001C60.0854 29.0676 61.0292 30.0139 62.1936 30.0139C63.358 30.0139 64.3019 29.0676 64.3019 27.9001V18.9164C64.3019 15.4141 61.4701 12.575 57.977 12.575H45.8546Z"
        fill={`url(#${gid(5)})`}
      />
      <path
        d="M151.268 12.575C147.774 12.575 144.943 15.4141 144.943 18.9164V27.9001C144.943 29.0676 145.887 30.0139 147.051 30.0139C148.215 30.0139 149.159 29.0676 149.159 27.9001V19.4448C149.159 17.9856 150.34 16.8026 151.795 16.8026H157.593C158.757 16.8026 159.701 15.8562 159.701 14.6888C159.701 13.5213 158.757 12.575 157.593 12.575H151.268Z"
        fill={`url(#${gid(6)})`}
      />
      <path
        d="M151.268 12.575C147.774 12.575 144.943 15.4141 144.943 18.9164V27.9001C144.943 29.0676 145.887 30.0139 147.051 30.0139C148.215 30.0139 149.159 29.0676 149.159 27.9001V19.4448C149.159 17.9856 150.34 16.8026 151.795 16.8026H157.593C158.757 16.8026 159.701 15.8562 159.701 14.6888C159.701 13.5213 158.757 12.575 157.593 12.575H151.268Z"
        fill={`url(#${gid(7)})`}
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.5183 21.2944C68.5183 26.1101 72.4119 30.0139 77.2148 30.0139C82.0178 30.0139 85.9114 26.1101 85.9114 21.2944C85.9114 16.4788 82.0178 12.575 77.2148 12.575C72.4119 12.575 68.5183 16.4788 68.5183 21.2944ZM77.2148 25.7863C79.6891 25.7863 81.6949 23.7753 81.6949 21.2944C81.6949 18.8136 79.6891 16.8026 77.2148 16.8026C74.7406 16.8026 72.7348 18.8136 72.7348 21.2944C72.7348 23.7753 74.7406 25.7863 77.2148 25.7863Z"
        fill={`url(#${gid(8)})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.5183 21.2944C68.5183 26.1101 72.4119 30.0139 77.2148 30.0139C82.0178 30.0139 85.9114 26.1101 85.9114 21.2944C85.9114 16.4788 82.0178 12.575 77.2148 12.575C72.4119 12.575 68.5183 16.4788 68.5183 21.2944ZM77.2148 25.7863C79.6891 25.7863 81.6949 23.7753 81.6949 21.2944C81.6949 18.8136 79.6891 16.8026 77.2148 16.8026C74.7406 16.8026 72.7348 18.8136 72.7348 21.2944C72.7348 23.7753 74.7406 25.7863 77.2148 25.7863Z"
        fill={`url(#${gid(9)})`}
      />
      <path
        d="M162.863 14.6888C162.863 13.5213 163.807 12.575 164.972 12.575C166.136 12.575 167.08 13.5213 167.08 14.6888V21.2944C167.08 23.7753 169.085 25.7863 171.559 25.7863C174.034 25.7863 176.039 23.7753 176.039 21.2944V14.6888C176.039 13.5213 176.983 12.575 178.148 12.575C179.312 12.575 180.256 13.5213 180.256 14.6888V21.2944C180.256 26.1101 176.363 30.0139 171.559 30.0139C166.757 30.0139 162.863 26.1101 162.863 21.2944V14.6888Z"
        fill={`url(#${gid(10)})`}
      />
      <path
        d="M162.863 14.6888C162.863 13.5213 163.807 12.575 164.972 12.575C166.136 12.575 167.08 13.5213 167.08 14.6888V21.2944C167.08 23.7753 169.085 25.7863 171.559 25.7863C174.034 25.7863 176.039 23.7753 176.039 21.2944V14.6888C176.039 13.5213 176.983 12.575 178.148 12.575C179.312 12.575 180.256 13.5213 180.256 14.6888V21.2944C180.256 26.1101 176.363 30.0139 171.559 30.0139C166.757 30.0139 162.863 26.1101 162.863 21.2944V14.6888Z"
        fill={`url(#${gid(11)})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M90.1281 7.81884C90.1281 6.6514 91.0719 5.70502 92.2363 5.70502C93.4007 5.70502 94.3446 6.6514 94.3446 7.81884V12.575H98.8242C103.628 12.575 107.521 16.4788 107.521 21.2944C107.521 26.1101 103.628 30.0139 98.8242 30.0139C94.0217 30.0139 90.1281 26.1101 90.1281 21.2944V7.81884ZM94.3446 21.2944C94.3446 23.7753 96.3499 25.7863 98.8242 25.7863C101.298 25.7863 103.305 23.7753 103.305 21.2944C103.305 18.8136 101.298 16.8026 98.8242 16.8026C96.3499 16.8026 94.3446 18.8136 94.3446 21.2944Z"
        fill={`url(#${gid(12)})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M90.1281 7.81884C90.1281 6.6514 91.0719 5.70502 92.2363 5.70502C93.4007 5.70502 94.3446 6.6514 94.3446 7.81884V12.575H98.8242C103.628 12.575 107.521 16.4788 107.521 21.2944C107.521 26.1101 103.628 30.0139 98.8242 30.0139C94.0217 30.0139 90.1281 26.1101 90.1281 21.2944V7.81884ZM94.3446 21.2944C94.3446 23.7753 96.3499 25.7863 98.8242 25.7863C101.298 25.7863 103.305 23.7753 103.305 21.2944C103.305 18.8136 101.298 16.8026 98.8242 16.8026C96.3499 16.8026 94.3446 18.8136 94.3446 21.2944Z"
        fill={`url(#${gid(13)})`}
      />
      <path
        d="M126.495 7.81884C126.495 6.6514 127.439 5.70502 128.603 5.70502C129.768 5.70502 130.712 6.6514 130.712 7.81884V12.575H134.929C136.093 12.575 137.037 13.5213 137.037 14.6888C137.037 15.8562 136.093 16.8026 134.929 16.8026H130.712V20.5017C130.712 23.4204 133.072 25.7863 135.983 25.7863H139.145C140.31 25.7863 141.254 26.7327 141.254 27.9001C141.254 29.0676 140.31 30.0139 139.145 30.0139H134.929C130.271 30.0139 126.495 26.2284 126.495 21.5586V7.81884Z"
        fill={`url(#${gid(14)})`}
      />
      <path
        d="M126.495 7.81884C126.495 6.6514 127.439 5.70502 128.603 5.70502C129.768 5.70502 130.712 6.6514 130.712 7.81884V12.575H134.929C136.093 12.575 137.037 13.5213 137.037 14.6888C137.037 15.8562 136.093 16.8026 134.929 16.8026H130.712V20.5017C130.712 23.4204 133.072 25.7863 135.983 25.7863H139.145C140.31 25.7863 141.254 26.7327 141.254 27.9001C141.254 29.0676 140.31 30.0139 139.145 30.0139H134.929C130.271 30.0139 126.495 26.2284 126.495 21.5586V7.81884Z"
        fill={`url(#${gid(15)})`}
      />
      <path
        d="M33.2141 22.0459C33.9289 30.7696 25.7503 36.8275 17.9006 34.2562C14.9337 33.2843 12.0853 31.9067 9.4401 30.1642C2.38525 25.5172 1.95059 14.8764 8.61471 9.73109C10.6092 8.19116 12.7446 6.88441 14.9812 5.82632C21.5773 2.70576 29.7982 7.05942 31.8656 14.488C32.5497 16.946 33.0038 19.4784 33.2141 22.0459Z"
        fill={`url(#${gid(16)})`}
      />
      <path
        d="M26.7921 29.1235C24.0701 33.5834 18.1259 34.4601 14.2764 30.9667C10.7005 27.7216 7.88964 23.6442 6.10674 19.1173C4.17187 14.2046 7.0645 8.77562 12.1624 7.74658C16.2168 6.92817 20.3667 6.96465 24.3556 7.80755C28.8162 8.75014 31.7433 13.0883 31.0085 17.6675C30.3611 21.7013 28.9405 25.6033 26.7921 29.1235Z"
        fill={`url(#${gid(17)})`}
      />
      <path
        d="M27.6859 26.2163C26.9139 28.7857 25.1667 30.7732 22.0721 30.1628C18.9776 29.5523 13.0211 26.7704 9.46652 22.5745C7.69935 20.4885 7.85822 17.3252 9.81971 15.4414C13.3341 12.0664 17.69 9.91104 22.2817 9.14604C24.5807 8.76305 26.8111 10.1185 27.6455 12.4056C29.2923 16.92 28.9092 22.1444 27.6859 26.2163Z"
        fill="#33109F"
      />
      <defs>
        <linearGradient
          id={gid(0)}
          x1="39.5298"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(1)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36917 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(2)}
          x1="39.5298"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(3)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36918 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(4)}
          x1="39.5298"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(5)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36917 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(6)}
          x1="39.5299"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(7)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36917 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(8)}
          x1="39.5297"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(9)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36917 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(10)}
          x1="39.5297"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(11)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36917 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(12)}
          x1="39.5298"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(13)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36917 -34.7619 31.2411 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(14)}
          x1="39.5296"
          y1="30.0694"
          x2="180.262"
          y2="17.9784"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33109F" />
          <stop offset="0.49017" stopColor="#33109F" />
          <stop offset="0.646231" stopColor="#45B7DE" />
          <stop offset="0.829925" stopColor="#4AE7F0" />
          <stop offset="1" stopColor="#4CDDE9" />
        </linearGradient>
        <radialGradient
          id={gid(15)}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.36918 -34.7619 31.2412 -1.237 104.172 50.0955)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EA673E" />
          <stop offset="1" stopColor="#EA673E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={gid(16)}
          x1="15.299"
          y1="9.77323"
          x2="31.4178"
          y2="37.7579"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5DEAF4" stopOpacity="0" />
          <stop offset="1" stopColor="#5DEAF4" />
        </linearGradient>
        <linearGradient
          id={gid(17)}
          x1="-6.16404"
          y1="8.54705"
          x2="35.5047"
          y2="37.0609"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.182292" stopColor="#8146FF" />
          <stop offset="0.771826" stopColor="#7000FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MobitruIcon;
