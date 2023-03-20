using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.AMIS.Common.Constrants
{
    public class ProcedureName
    {
        /// <summary>
        /// ProcedureName getbyid
        /// </summary>
        public static string Get = "Proc_{0}_Get{1}";

        /// <summary>
        /// ProcedureName insert
        /// </summary>
        public static string Insert = "Proc_{0}_Insert";

        /// <summary>
        /// ProcedureName update
        /// </summary>
        public static string Update = "Proc_{0}_Update";

        /// <summary>
        /// ProcedureName delete
        /// </summary>
        public static string Delete = "Proc_{0}_Delete";

        /// <summary>
        /// ProcedureName phân trang và tìm kiếm
        /// </summary>
        public static string Filter = "Proc_{0}_Search_Paging";
    }
}
