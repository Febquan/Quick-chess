import React from "react";
import { onclickProps } from "./type";
const Pawn: React.FC<onclickProps> = ({ onClick }) => {
  return (
    <svg onClick={onClick} viewBox="0 0 907 1254" fill="none">
      <path
        d="M796.448 1151H692.316C709.747 1151 723.385 1135.37 720.499 1118.17C707.2 1039 650.04 974.427 627.856 951.96C622.479 946.467 615.179 943.413 607.481 943.413H711.615C719.311 943.413 726.612 946.467 731.988 951.96C754.173 974.427 811.332 1039 824.632 1118.17C827.519 1135.37 813.879 1151 796.448 1151Z"
        fill="#474747"
      />
      <path
        d="M889.171 1201.37V1201.45C889.171 1220.76 873.52 1236.4 854.215 1236.4H52.3632C33.0585 1236.4 17.408 1220.76 17.408 1201.45V1201.37C17.408 1182.07 33.0585 1166.43 52.3632 1166.43H854.215C873.52 1166.43 889.171 1182.07 889.171 1201.37Z"
        fill="#242423"
      />
      <path
        d="M52.3644 1183.76C42.6515 1183.76 34.7472 1191.67 34.7472 1201.37C34.7472 1211.16 42.6515 1219.07 52.3644 1219.07H854.216C863.929 1219.07 871.829 1211.16 871.829 1201.44V1201.37C871.829 1191.67 863.929 1183.76 854.216 1183.76H52.3644ZM854.216 1253.75H52.3644C23.527 1253.75 0.0681152 1230.28 0.0681152 1201.44C0.0681152 1172.55 23.527 1149.08 52.3644 1149.08H854.216C883.049 1149.08 906.509 1172.55 906.509 1201.37V1201.44C906.509 1230.28 883.049 1253.75 854.216 1253.75Z"
        fill="black"
      />
      <path
        d="M732.699 876.987V877.067C732.699 896.36 717.048 912.013 697.742 912.013H208.905C189.6 912.013 173.949 896.36 173.949 877.067V876.987C173.949 857.68 189.6 842.04 208.905 842.04H697.742C717.048 842.04 732.699 857.68 732.699 876.987Z"
        fill="#242423"
      />
      <path
        d="M208.905 859.374C199.192 859.374 191.291 867.28 191.291 876.987C191.291 886.774 199.192 894.68 208.905 894.68H697.744C707.457 894.68 715.357 886.774 715.357 877.067V876.987C715.357 867.28 707.457 859.374 697.744 859.374H208.905ZM697.744 929.36H208.905C180.071 929.36 156.612 905.894 156.612 877.067C156.612 848.147 180.071 824.694 208.905 824.694H697.744C726.577 824.694 750.037 848.147 750.037 876.987V877.067C750.037 905.894 726.577 929.36 697.744 929.36Z"
        fill="black"
      />
      <path
        d="M580.875 310.827C580.875 330.107 565.199 345.773 545.917 345.773H360.661C341.38 345.773 325.705 330.107 325.705 310.827C325.705 301.187 329.659 292.441 335.971 286.134C341.796 280.307 349.772 276.494 358.58 276.001C359.275 275.867 359.968 275.867 360.661 275.867H545.917C546.611 275.867 547.304 275.867 547.997 276.001C566.308 277.041 580.875 292.227 580.875 310.827Z"
        fill="#242423"
      />
      <path
        d="M360.951 293.2L359.539 293.32C355.285 293.547 351.268 295.347 348.231 298.387C344.888 301.733 343.045 306.147 343.045 310.827C343.045 320.534 350.949 328.44 360.663 328.44H545.917C555.631 328.44 563.535 320.534 563.535 310.827C563.535 301.534 556.277 293.84 547.012 293.32L545.633 293.2H360.951ZM545.917 363.12H360.663C331.825 363.12 308.367 339.654 308.367 310.827C308.367 296.88 313.816 283.76 323.712 273.867C332.575 265 344.261 259.653 356.707 258.747C358.387 258.533 359.763 258.534 360.663 258.534H545.917C546.819 258.534 548.197 258.533 549.884 258.747C577.057 260.76 598.213 283.467 598.213 310.827C598.213 339.654 574.755 363.12 545.917 363.12Z"
        fill="black"
      />
      <path
        d="M822.461 1166.43H84.1875C62.8 1166.43 46.0683 1147.33 49.6084 1126.24C65.8937 1029.21 135.975 950.08 163.136 922.507C169.736 915.8 178.7 912.013 188.105 912.013H718.543C727.948 912.013 736.912 915.8 743.512 922.507C770.673 950.08 840.755 1029.21 857.04 1126.24C860.58 1147.33 843.849 1166.43 822.461 1166.43Z"
        fill="#242423"
      />
      <path
        d="M188.104 929.36C183.345 929.36 178.865 931.24 175.492 934.667C147.895 962.68 82.0478 1037.71 66.7067 1129.11C65.5963 1135.72 68.6265 1140.48 70.5302 1142.73C73.9406 1146.77 78.9193 1149.08 84.1885 1149.08H822.46C827.729 1149.08 832.708 1146.77 836.119 1142.73C838.021 1140.48 841.052 1135.72 839.941 1129.11C824.6 1037.72 758.753 962.693 731.156 934.667C727.783 931.24 723.303 929.36 718.545 929.36H188.104ZM822.46 1183.76H84.1885C68.6983 1183.76 54.0713 1176.97 44.0573 1165.15C34.215 1153.51 30.0057 1138.28 32.5087 1123.36C49.4859 1022.21 120.88 940.693 150.787 910.333C160.727 900.24 173.981 894.68 188.104 894.68H718.545C732.667 894.68 745.923 900.24 755.865 910.333C785.772 940.693 857.165 1022.23 874.14 1123.36C876.643 1138.28 872.433 1153.51 862.592 1165.15C852.577 1176.97 837.951 1183.76 822.46 1183.76Z"
        fill="black"
      />
      <path
        d="M771.269 983.44C770.227 983.307 769.248 983.253 768.204 983.253H269.241C260.435 983.253 251.953 986.653 245.755 992.773C222.921 1015.24 167.663 1075.29 145.351 1151H104.183C84.0892 1151 68.3657 1133.59 71.6933 1114.41C86.9594 1026.15 152.917 954.173 178.427 929.12C184.689 923 193.107 919.6 201.913 919.6H700.876C709.748 919.6 718.164 923 724.361 929.12C735.127 939.72 753.068 958.52 771.269 983.44Z"
        fill="#141413"
      />
      <path
        d="M630.464 842.04H276.115C254.267 842.04 237.759 822.2 241.713 800.76L320.435 374.347C323.485 357.773 337.912 345.773 354.767 345.773H551.813C568.667 345.773 583.093 357.773 586.145 374.347L664.867 800.76C668.82 822.2 652.313 842.04 630.464 842.04Z"
        fill="#242423"
      />
      <path
        d="M354.767 363.12C346.287 363.12 339.019 369.16 337.485 377.494L258.767 803.92C257.817 809.04 259.199 814.307 262.556 818.333C264.533 820.707 268.925 824.694 276.116 824.694H630.465C637.652 824.694 642.044 820.707 644.021 818.333C647.379 814.307 648.76 809.04 647.815 803.907L569.093 377.507C567.559 369.16 560.291 363.12 551.815 363.12H354.767ZM630.465 859.374H276.116C260.533 859.374 245.876 852.507 235.9 840.52C225.936 828.547 221.841 812.907 224.663 797.613L303.381 371.2C307.943 346.427 329.553 328.44 354.767 328.44H551.815C577.024 328.44 598.633 346.427 603.196 371.213L681.919 797.613C684.74 812.907 680.641 828.547 670.675 840.52C660.701 852.507 646.044 859.374 630.465 859.374Z"
        fill="black"
      />
      <path
        d="M611.511 820.453H537.999C557.944 820.453 573.015 802.347 569.405 782.773L497.539 393.506C494.753 378.373 481.583 367.413 466.196 367.413H539.709C555.095 367.413 568.265 378.373 571.051 393.506L642.916 782.773C646.525 802.347 631.457 820.453 611.511 820.453Z"
        fill="#474747"
      />
      <path
        d="M580.875 428.8H421.68C406.056 428.8 392.684 439.92 389.853 455.28L321.767 823.946H286.405C266.152 823.946 250.849 805.56 254.515 785.693L327.489 390.413C330.319 375.04 343.691 363.92 359.315 363.92H541.976C557.6 363.92 570.973 375.04 573.801 390.413L580.875 428.8Z"
        fill="#141413"
      />
      <path
        d="M599.6 164.48C599.6 209.213 579.556 249.227 547.997 276C547.304 275.867 546.611 275.867 545.917 275.867H360.661C359.968 275.867 359.275 275.867 358.58 276C327.023 249.16 306.979 209.213 306.979 164.48C306.979 83.6797 372.521 18.2 453.324 18.2C534.127 18.2 599.6 83.6797 599.6 164.48Z"
        fill="#242423"
      />
      <path
        d="M365.041 258.534H541.549C567.497 234.214 582.26 200.293 582.26 164.48C582.26 93.3867 524.42 35.5337 453.324 35.5337C382.188 35.5337 324.317 93.3867 324.317 164.48C324.317 200.227 339.083 234.147 365.041 258.534ZM353.707 294.627L347.347 289.213C310.673 258.013 289.639 212.547 289.639 164.48C289.639 74.2534 363.068 0.8535 453.324 0.8535C543.541 0.8535 616.939 74.2534 616.939 164.48C616.939 212.627 595.897 258.107 559.213 289.227L552.857 294.613L545.633 293.2H360.951L353.707 294.627Z"
        fill="black"
      />
      <path
        d="M403.547 162.027C403.547 200.347 420.679 234.547 447.684 257.56H366.844C366.248 257.56 365.655 257.56 365.059 257.68C337.992 234.666 320.803 200.4 320.803 162.027C320.803 92.7332 377.016 36.5729 446.316 36.5729C460.831 36.5729 474.809 39.0133 487.719 43.6C438.703 60.6667 403.547 107.24 403.547 162.027Z"
        fill="#141413"
      />
      <path
        d="M586.975 162.027C586.975 200.4 569.784 234.72 542.717 257.68C542.123 257.56 541.528 257.56 540.933 257.56H490.132C517.139 234.6 534.271 200.347 534.271 162.027C534.271 101.773 491.797 51.4529 435.168 39.3729C443.675 37.5329 452.479 36.5729 461.52 36.5729C530.821 36.5729 586.975 92.7332 586.975 162.027Z"
        fill="#474747"
      />
      <path
        d="M490.132 257.56C490.073 257.627 490.073 257.626 490.013 257.68C489.419 257.56 488.824 257.56 488.229 257.56H490.132Z"
        fill="#474747"
      />
      <path
        d="M548.109 275.894C548.04 275.96 548.04 275.96 547.97 276.04C547.276 275.893 546.584 275.894 545.889 275.894H548.109Z"
        fill="#141413"
      />
      <path
        d="M457.111 275.894C456.417 275.894 455.724 275.893 455.031 276.04C454.961 275.96 454.961 275.96 454.891 275.894H457.111Z"
        fill="#141413"
      />
    </svg>
  );
};

export default Pawn;
