import {useEffect, useState} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ReportDefinitionBadUX({clientId, apiKey, reportId}) {
    const [rows, setRows] = useState([
        { reportId: reportId, columnId: "", sortNumber: "", header: "" }
    ]);

    const handleAddRow = () => {
        setRows([
            ...rows,
            { reportId: reportId, columnId: "", sortNumber: "", header: "" }
        ]);
    };

    const handleRemoveRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleChange = (e, index, field) => {
        const newRows = [...rows];
        newRows[index][field] = e.target.value;
        setRows(newRows);
    };

    const generateQuery = () => {
        const query = rows
            .map(
                (row) =>
                    `(${reportId}, ${row.columnId}, ${row.sortNumber}, '${row.header}')`
            )
            .join(",");
        return `INSERT INTO testdb.column_to_cost_report (report_id, column_id, sort_number, header)
    VALUES \n${query};`;
    };

    return (
        <>
            <h3>Add manually report definition:</h3>
            {rows.map((row, index) => (
                <div key={index}>
                    <label>
                        Column ID:{" "}
                        <input
                            value={row.columnId}
                            onChange={(e) => handleChange(e, index, "columnId")}
                        />
                    </label>
                    <br />
                    <label>
                        Sort Number:{" "}
                        <input
                            value={row.sortNumber}
                            onChange={(e) => handleChange(e, index, "sortNumber")}
                        />
                    </label>
                    <br />
                    <label>
                        Header:{" "}
                        <input
                            value={row.header}
                            onChange={(e) => handleChange(e, index, "header")}
                        />
                    </label>
                    <br />
                    <br />
                    <button onClick={() => handleRemoveRow(index)}>Remove Row</button>
                </div>
            ))}
            <br />
            <button onClick={handleAddRow}>Add Row</button>
            <br/>
            <textarea value={generateQuery()} cols={100} rows={35} readOnly></textarea>
            <br/>
            <CopyToClipboard
                text={generateQuery()}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </>
    );
}


function NewCostReport({clientId, apiKey, reportId}) {
    const [name, setName] = useState("");
    const [report_consumer, setReport_consumer] = useState("");

    const script = `INSERT INTO testdb.cost_report (report_id, client_id, api_key, name, report_consumer) VALUES \n
  (${reportId}, ${clientId}, '${apiKey}', '${name}', '${report_consumer}');`;
    return (
        <>
            <br/>
            <h3>Add new report script creator:</h3>
            <Input
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            report consumer
            <select
                name="report_consumer"
                onChange={(e) => setReport_consumer(e.target.value)}
            >
                <option disabled selected value>select type</option>
                <option value="appsflyer">appsflyer</option>
                <option value="tenjin">tenjin</option>
                <option value="appsumer">appsumer</option>
                <option value="singular">singular</option>
                <option value="generic">generic</option>
            </select>
            <br/>
            <br />
            <textarea value={script} cols={100} rows={4} readOnly></textarea>
            <br/>
            <CopyToClipboard
                text={script}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </>
    );
}

function Input({ label, value, onChange }) {
    return (
        <label>
            {label} <input value={value} onChange={onChange} />
        </label>
    );
}

function UpdateClientReporting({clientId, apiKey, reportId}) {

    const query = `UPDATE testdb.clients t SET t.is_reporting = 1 WHERE t.id = ${clientId};`;

    return (
        <>
            <h3>Update client to reporting true:</h3>
            <textarea value={query} cols={100} rows={2} readOnly></textarea>
            <br/>
            <CopyToClipboard
                text={query}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </>
    );
}


function AddEmailToReport({clientId, apiKey, reportId}) {
    const [email, setEmail] = useState("");
    const [bcc, setBcc] = useState("");
    const [emailTitle, setEmailTitle] = useState("");

    const query = `INSERT INTO testdb.client_to_email (client_id, email, bcc, email_title, email_zip, report_api_key, is_application_breakdown)
   VALUES \n (${clientId}, '${email}', '${bcc}', '${emailTitle}', 0, '${apiKey}', 0);`;

    return (
        <>
            <h3>Add send email report:</h3>
            <label>
                Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                BCC: <input value={bcc} onChange={(e) => setBcc(e.target.value)} />
            </label>
            <br />
            <label>
                Email Title: <input value={emailTitle} onChange={(e) => setEmailTitle(e.target.value)} />
            </label>
            <br/>
            <textarea value={query} cols={100} rows={8} readOnly></textarea>
            <br/>
            <CopyToClipboard
                text={query}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </>
    );
}

const appsflyerRows = [
    { columnId: 1, sortNumber: 0, header: "date" },
    { columnId: 44444, sortNumber: 1, header: "app-id" },
    { columnId: 29, sortNumber: 2, header: "media-source" },
    { columnId: 7, sortNumber: 3, header: "campaign" },
    { columnId: 25, sortNumber: 4, header: "spend" },
    { columnId: 10, sortNumber: 5, header: "geo" },
    { columnId: 5, sortNumber: 6, header: "currency" },
    { columnId: 8, sortNumber: 7, header: "campaign-id" },
    { columnId: 11, sortNumber: 8, header: "site-id" },
];

const singularRows = [
    {columnId: 1, sortNumber: 1, header: 'date'},
    {columnId: 3, sortNumber: 2, header: 'app'},
    {columnId: 4, sortNumber: 3, header: 'store ID'},
    {columnId: 8, sortNumber: 4, header: 'campaign ID'},
    {columnId: 7, sortNumber: 5, header: 'campaign name'},
    {columnId: 11, sortNumber: 6, header: 'publisher_id'},
    {columnId: 9, sortNumber: 7, header: 'platform'},
    {columnId: 10, sortNumber: 8, header: 'country'},
    {columnId: 27, sortNumber: 9, header: 'retargeting'},
    {columnId: 28, sortNumber: 10, header: 'sub_adnetwork'},
    {columnId: 21, sortNumber: 11, header: 'impressions'},
    {columnId: 22, sortNumber: 12, header: 'clicks'},
    {columnId: 34, sortNumber: 13, header: 'installs'},
    {columnId: 24, sortNumber: 14, header: 'cost'},
    {columnId: 14, sortNumber: 15, header: 'creative name'},
    {columnId: 15, sortNumber: 16, header: 'creative id'},
    {columnId: 31, sortNumber: 17, header: 'adset'},
    {columnId: 5, sortNumber: 18, header: 'currency'}
];

function PreDefinedReport({reportDef, reportId}) {
    const [rows, setRows] = useState(reportDef);

    const generateQuery = () => {
        const query = rows
            .map(
                (row) => `(${reportId}, ${row.columnId}, ${row.sortNumber}, '${row.header}')`
            )
            .join(",\n");
        return `INSERT INTO testdb.column_to_cost_report (report_id, column_id, sort_number, header)
    VALUES \n ${query};`;
    };

    return (
        <>
            <textarea value={generateQuery()} cols={100} rows={20} readOnly></textarea>
            <br/>
            <CopyToClipboard
                text={generateQuery()}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </>
    );
}


const ReportDefinition = ({ reportId }) => {
    const [columnIds, setColumnIds] = useState("");
    const [headers, setHeaders] = useState("");
    const [sortNumber, setSortNumber] = useState(0);
    const [query, setQuery] = useState("");

    const handleColumnIdsChange = (e) => {
        setColumnIds(e.target.value);
    };

    const handleHeadersChange = (e) => {
        setHeaders(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const columnIdList = columnIds.split("\n");
        const headerList = headers.split("\n");
        const values = columnIdList.map((columnId, index) => {
            return `(${reportId}, ${columnId}, ${sortNumber + index}, '${headerList[index]}')`;
        });
        setQuery(
            `INSERT INTO testdb.column_to_cost_report (report_id, column_id, sort_number, header) VALUES \n ${values.join(
                ",\n"
            )};`
        );
    };

    return (
        <>
            <h3>Create custom report by definitions:</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Column IDs:
                    <br/>
                    <textarea value={columnIds} cols={50} rows={10} onChange={handleColumnIdsChange} />
                </label>
                <br />
                <label>
                    Headers:
                    <br/>
                    <textarea value={headers} cols={50} rows={10} onChange={handleHeadersChange} />
                </label>
                <br />
                <button type="submit">Create Query</button>
            </form>
            <h4>The custom report query:</h4>
            <textarea value={query} cols={100} rows={20} readOnly></textarea>
            <br/>
            <CopyToClipboard
                text={query}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </>
    );
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function CostReport() {
    const [applicationId, setApplicationId] = useState("");
    const [clientId, setClientId] = useState("");
    const [apiKey, setApikey] = useState(makeid(20));
    const [reportId, setReportId] = useState("");
    const [os, setOs] = useState("");

    return (
        <>
            <h1>This is the support page!</h1>
            <h3>Fill this once for the new report:</h3>
            Client name*:
            <select onChange={(e) => setClientId(e.target.value)}>
                <option value={''}>Choose</option>
            {clients.map(({id, name}, index) => (
                <option key={index} value={id} >{name}</option>
            ))}
            </select>
            Client ID: <input disabled value={clientId} />
            <br/>
            API key (do not share via Monday or YouTrack): <input disabled value={apiKey} />
            <br/>
            Report ID*: <input type={'number'} value={reportId} onChange={(e) => setReportId(e.target.value)} />
            <br/>
            <br/>
            <UpdateClientReporting clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <br/>
            <NewCostReport clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <br/>
            <AddEmailToReport clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <br/>
            <h4>Appsflyer:</h4>
            <PreDefinedReport reportDef={appsflyerRows} clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <h4>Singular:</h4>
            <PreDefinedReport reportDef={singularRows} clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <br/>
            <ReportDefinition clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <br/>
            <ReportDefinitionBadUX clientId={clientId} apiKey={apiKey} reportId={reportId}/>
            <br/>
            <br/>

            <h1>This is the audience part!</h1>
            <h3>Fill this once for the new report:</h3>
            Application name*:
            <select onChange={(e) => setApplicationId(e.target.value)}>
                <option value={''}>Choose</option>
                {applications.map(({id, name}, index) => (
                    <option key={index} value={id} >{name}</option>
                ))}
            </select>*
            <select
                name="os"
                onChange={(e) => setOs(e.target.value)}
            >
                <option disabled selected value>select os</option>
                <option value="ios">ios</option>
                <option value="android">android</option>
            </select>
            <AddAudience os={os} applicationId={applicationId}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    );
}

const AddAudience = ({os, applicationId}) => {
    const [query, setQuery] = useState('');
    const [appsflyerApi, setappsflyerApi] = useState('');
    const [adjust, setAdjust] = useState('');
    const [name, setName] = useState('');
    const [bucket, setBucket] = useState('');
    const [bucketPrefix, setBucketPrefix] = useState('');
    const [keyword, setKeyword] = useState('');
    const [apiKey, setApikey] = useState(makeid(32));
    const [adjustName, setAdjustName] = useState('');
    const [adjustUrl, setAdjustUrl] = useState('');

    // generate container_id with 9 digits
    const containerId = Math.floor(1000000000 + Math.random() * 900000)

    const handleChangeAdjustName = (event) => {
        setAdjustName(event.target.value);
    };
    const handleChangeAdjustUrl = (event) => {
        setAdjustUrl(event.target.value);
    };
    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeBucket = (event) => {
        setBucket(event.target.value);
    };
    const handleChangeBucketPrefix = (event) => {
        setBucketPrefix(event.target.value);
    };
    const handleChangeKeyword = (event) => {
        setKeyword(event.target.value);
    };

    useEffect(() => {
        const insertQuery = `INSERT into audience_containers (app_id, os, container_id, name, bucket, bucket_prefix, keyword)
VALUES
(${applicationId}, '${os}', round(unix_timestamp() + rand() * 10000), '${name}','${bucketPrefix}', '${bucket}','${keyword}');`;
        setQuery(insertQuery);
    }, [applicationId, os, name, bucket, bucketPrefix, keyword]);

    useEffect(() => {
        const appsflyerApi = `UPDATE testdb.applications t
SET t.api_key          = '${apiKey}',
    t.partner_pull_key = 'rj1dwdbxss6b'
WHERE t.id = ${applicationId};`
        setappsflyerApi(appsflyerApi);
    }, [applicationId, os, name, bucket, bucketPrefix, keyword]);

    useEffect(() => {
        const adjust = `
        INSERT into audience_containers (app_id, os, container_id, name, url)
VALUES
(${applicationId}, '${os}', round(unix_timestamp() + rand() * 10000), '${adjustName}', '${adjustUrl}');
        `;
        setAdjust(adjust);
    }, [applicationId, os, name, bucket, bucketPrefix, keyword, adjustName, adjustUrl]);

    return (
        <div>
            <br/>
            <h3>S3</h3>
            <label>
                Audience file name:
                <input type="text" value={name} onChange={handleChangeName} />
            </label>
            <br />
            <label>
                File path:
                <input type="text" value={bucketPrefix} onChange={handleChangeBucketPrefix} />
            </label>
            <br />
            <label>
                Bucket path:
                <input type="text" value={bucket} onChange={handleChangeBucket} />
            </label>
            <br />
            <label>
                File prefix:
                <input type="text" value={keyword} onChange={handleChangeKeyword} />
            </label>
            <br />
            <br />
            <textarea value={query} readOnly rows={10} cols={100}
            />
            <br/>
            <CopyToClipboard
                text={query}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
            <br/>
            <br/>
            <h3>Appsflyer API</h3>
            <textarea value={appsflyerApi} readOnly rows={10} cols={100}
            />
            <br/>
            <CopyToClipboard
                text={appsflyerApi}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
            <br/>
            <br/>
            <h3>Adjust</h3>
            <label>
                Audience file name:
                <input type="text" value={adjustName} onChange={handleChangeAdjustName} />
            </label>
            <br />
            <label>
                File path:
                <input type="text" value={adjustUrl} onChange={handleChangeAdjustUrl} />
            </label>
            <br />
            <br />
            <textarea value={adjust} readOnly rows={10} cols={100}
            />
            <br/>
            <CopyToClipboard
                text={adjust}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </div>
    );
};

const clients =
    [
        {
            "id": 1,
            "name": "AnyOption"
        },
        {
            "id": 2,
            "name": "AppLift"
        },
        {
            "id": 3,
            "name": "Awem Games"
        },
        {
            "id": 4,
            "name": "BitMango"
        },
        {
            "id": 5,
            "name": "DoubleUGames"
        },
        {
            "id": 6,
            "name": "Epic Action"
        },
        {
            "id": 7,
            "name": "Fetch Media"
        },
        {
            "id": 8,
            "name": "Gett"
        },
        {
            "id": 9,
            "name": "IGG"
        },
        {
            "id": 10,
            "name": "JOYCITY Corp"
        },
        {
            "id": 11,
            "name": "LOVOO GmbH"
        },
        {
            "id": 12,
            "name": "Madup"
        },
        {
            "id": 13,
            "name": "MiniClip"
        },
        {
            "id": 14,
            "name": "MobiKwik"
        },
        {
            "id": 15,
            "name": "Mobile Embrace"
        },
        {
            "id": 16,
            "name": "OMV"
        },
        {
            "id": 17,
            "name": "Playtika"
        },
        {
            "id": 18,
            "name": "Scientific Games"
        },
        {
            "id": 19,
            "name": "Shellanoo Group"
        },
        {
            "id": 20,
            "name": "Social Point"
        },
        {
            "id": 21,
            "name": "Travelocity"
        },
        {
            "id": 22,
            "name": "Wadi"
        },
        {
            "id": 23,
            "name": "XPOGames"
        },
        {
            "id": 24,
            "name": "Huuuge"
        },
        {
            "id": 25,
            "name": "MakeMyTrip"
        },
        {
            "id": 26,
            "name": "Glispa"
        },
        {
            "id": 27,
            "name": "NordVPN"
        },
        {
            "id": 28,
            "name": "Joom"
        },
        {
            "id": 29,
            "name": "LeoVegas"
        },
        {
            "id": 30,
            "name": "Taptica Direct"
        },
        {
            "id": 31,
            "name": "Ulu Game (Gameland)"
        },
        {
            "id": 33,
            "name": "Adinnovation"
        },
        {
            "id": 34,
            "name": "Popixels"
        },
        {
            "id": 35,
            "name": "Saatchi"
        },
        {
            "id": 36,
            "name": "Colonne"
        },
        {
            "id": 37,
            "name": "Vuclip"
        },
        {
            "id": 39,
            "name": "William Hill"
        },
        {
            "id": 40,
            "name": "Youappi"
        },
        {
            "id": 41,
            "name": "888"
        },
        {
            "id": 42,
            "name": "WAKUPL"
        },
        {
            "id": 43,
            "name": "GSN"
        },
        {
            "id": 44,
            "name": "Netmining"
        },
        {
            "id": 45,
            "name": "Croud"
        },
        {
            "id": 46,
            "name": "Bigo"
        },
        {
            "id": 47,
            "name": "Gan"
        },
        {
            "id": 50,
            "name": "playstudios"
        },
        {
            "id": 51,
            "name": "Autodoc"
        },
        {
            "id": 52,
            "name": "Triwin"
        },
        {
            "id": 53,
            "name": "Moburst"
        },
        {
            "id": 54,
            "name": "Million Victories"
        },
        {
            "id": 55,
            "name": "Bagelcode"
        },
        {
            "id": 56,
            "name": "Hily Corp"
        },
        {
            "id": 57,
            "name": "Cyberghost"
        },
        {
            "id": 58,
            "name": "Fitness AI"
        },
        {
            "id": 59,
            "name": "Zimad"
        },
        {
            "id": 60,
            "name": "Zoomd"
        },
        {
            "id": 61,
            "name": "Come2Play"
        },
        {
            "id": 62,
            "name": "Ruby Seven Studios"
        },
        {
            "id": 63,
            "name": "Zeta Global"
        },
        {
            "id": 64,
            "name": "Natural intelligence"
        },
        {
            "id": 65,
            "name": "Papaya Gaming"
        },
        {
            "id": 66,
            "name": "Zynga"
        },
        {
            "id": 67,
            "name": "DGN"
        },
        {
            "id": 68,
            "name": "Murka"
        },
        {
            "id": 69,
            "name": "Bole Games"
        },
        {
            "id": 70,
            "name": "ME2ZEN"
        },
        {
            "id": 71,
            "name": "Popreach"
        },
        {
            "id": 73,
            "name": "IGS"
        },
        {
            "id": 74,
            "name": "SuperPlay"
        },
        {
            "id": 75,
            "name": "Comunix"
        },
        {
            "id": 76,
            "name": "Baba Entertainment"
        },
        {
            "id": 77,
            "name": "Product Madness"
        },
        {
            "id": 78,
            "name": "Avia Games"
        },
        {
            "id": 79,
            "name": "My Games"
        },
        {
            "id": 80,
            "name": "WGames"
        },
        {
            "id": 81,
            "name": "AppQuantum"
        },
        {
            "id": 82,
            "name": "Tripledot"
        },
        {
            "id": 90,
            "name": "Play perfect"
        },
        {
            "id": 91,
            "name": "Innplay Labs"
        },
        {
            "id": 92,
            "name": "Skillz"
        },
        {
            "id": 93,
            "name": "Pixonic"
        },
        {
            "id": 94,
            "name": "Mobile Premier League"
        },
        {
            "id": 96,
            "name": "Bigabid Test"
        },
        {
            "id": 97,
            "name": "DoubleDown Interactive LL"
        },
        {
            "id": 98,
            "name": "Gamehaus"
        },
        {
            "id": 99,
            "name": "Tactile Games"
        },
        {
            "id": 100,
            "name": "Voodoo"
        },
        {
            "id": 101,
            "name": "AppLovin"
        },
        {
            "id": 102,
            "name": "DO_NOT_USE_Gamehaus"
        },
        {
            "id": 103,
            "name": "Mobee Co., Ltd."
        },
        {
            "id": 104,
            "name": "Empire Games"
        },
        {
            "id": 105,
            "name": "Candivore"
        }
    ]

const applications = [
    {
        "id": 107,
        "name": "32Red Casino & Slots"
    },
    {
        "id": 20,
        "name": "8 Ball Pool"
    },
    {
        "id": 68,
        "name": "88 Fortunes"
    },
    {
        "id": 60,
        "name": "888 Casino"
    },
    {
        "id": 118,
        "name": "ARK Slots"
    },
    {
        "id": 40,
        "name": "AliExpress"
    },
    {
        "id": 166,
        "name": "Animal Kingdom: Coin Raid"
    },
    {
        "id": 105,
        "name": "Apple Music"
    },
    {
        "id": 77,
        "name": "Autodoc"
    },
    {
        "id": 71,
        "name": "BRD"
    },
    {
        "id": 137,
        "name": "Baba Wild Slots"
    },
    {
        "id": 101,
        "name": "Backgammon"
    },
    {
        "id": 177,
        "name": "Best Fiends"
    },
    {
        "id": 174,
        "name": "Best Fiends Stars"
    },
    {
        "id": 106,
        "name": "Betway"
    },
    {
        "id": 92,
        "name": "Billion Cash Slots"
    },
    {
        "id": 65,
        "name": "Bingo Bash"
    },
    {
        "id": 97,
        "name": "Bingo Blitz"
    },
    {
        "id": 146,
        "name": "Bingo Cash "
    },
    {
        "id": 147,
        "name": "Bingo Clash"
    },
    {
        "id": 33,
        "name": "Bingo Drive"
    },
    {
        "id": 175,
        "name": "Bingo Live: Play With Hos"
    },
    {
        "id": 62,
        "name": "Bingo Showdown"
    },
    {
        "id": 167,
        "name": "Blackout Bingo"
    },
    {
        "id": 9,
        "name": "Block! Hexa Puzzle"
    },
    {
        "id": 113,
        "name": "Board Kings"
    },
    {
        "id": 117,
        "name": "Bubble Cash"
    },
    {
        "id": 25,
        "name": "Caesars Casino"
    },
    {
        "id": 120,
        "name": "Cash Billionaire"
    },
    {
        "id": 121,
        "name": "Cash Frenzy"
    },
    {
        "id": 78,
        "name": "Cash Strom Casino"
    },
    {
        "id": 181,
        "name": "Cash Tornado Slots"
    },
    {
        "id": 138,
        "name": "Cashman Casino Las Vegas "
    },
    {
        "id": 103,
        "name": "Casino"
    },
    {
        "id": 53,
        "name": "Casino Int."
    },
    {
        "id": 35,
        "name": "CasinoSlots"
    },
    {
        "id": 36,
        "name": "CasinoTexas"
    },
    {
        "id": 122,
        "name": "Classic Slots Las Vegas"
    },
    {
        "id": 86,
        "name": "Club Vegas"
    },
    {
        "id": 8,
        "name": "Cradle of Empires"
    },
    {
        "id": 94,
        "name": "Cyberghost"
    },
    {
        "id": 132,
        "name": "Dice Dreams"
    },
    {
        "id": 24,
        "name": "DotsAddict"
    },
    {
        "id": 182,
        "name": "Double Win Slots"
    },
    {
        "id": 178,
        "name": "Double Win Slots: Vegas C"
    },
    {
        "id": 176,
        "name": "DoubleDown Casino Vegas S"
    },
    {
        "id": 123,
        "name": "DoubleHit Slot"
    },
    {
        "id": 13,
        "name": "DoubleU Casino"
    },
    {
        "id": 30,
        "name": "Dragon City"
    },
    {
        "id": 99,
        "name": "E-toro"
    },
    {
        "id": 184,
        "name": "Empire Bingo"
    },
    {
        "id": 151,
        "name": "FarmVille 3 - Animals"
    },
    {
        "id": 14,
        "name": "Final Fantasy XV"
    },
    {
        "id": 95,
        "name": "Fitness AI"
    },
    {
        "id": 21,
        "name": "Football Strike"
    },
    {
        "id": 81,
        "name": "GIF Maker by Momento"
    },
    {
        "id": 111,
        "name": "GOT Slot"
    },
    {
        "id": 67,
        "name": "GSN Casino"
    },
    {
        "id": 15,
        "name": "Get Taxi"
    },
    {
        "id": 43,
        "name": "Glory"
    },
    {
        "id": 91,
        "name": "Gold Fortune Casino"
    },
    {
        "id": 131,
        "name": "Golden HoYeah Slots"
    },
    {
        "id": 59,
        "name": "Goldfish Casino"
    },
    {
        "id": 58,
        "name": "Governor of Poker"
    },
    {
        "id": 51,
        "name": "Grab"
    },
    {
        "id": 187,
        "name": "Grand Cash Casino"
    },
    {
        "id": 93,
        "name": "Grand Jackpot Slots"
    },
    {
        "id": 49,
        "name": "Happy Mail"
    },
    {
        "id": 88,
        "name": "Hily Dating App"
    },
    {
        "id": 142,
        "name": "Hit it Rich!"
    },
    {
        "id": 180,
        "name": "Hole.io"
    },
    {
        "id": 84,
        "name": "HomeAdvisor"
    },
    {
        "id": 72,
        "name": "Hot Shot Casino"
    },
    {
        "id": 26,
        "name": "House Of Fun"
    },
    {
        "id": 152,
        "name": "Idle Lumber Empire"
    },
    {
        "id": 183,
        "name": "Ignite Classic Slots"
    },
    {
        "id": 64,
        "name": "Ikukuru"
    },
    {
        "id": 28,
        "name": "Jackpot Party"
    },
    {
        "id": 125,
        "name": "Jackpot World"
    },
    {
        "id": 87,
        "name": "JackpotJoy"
    },
    {
        "id": 172,
        "name": "JellyShift 3D"
    },
    {
        "id": 39,
        "name": "Joom"
    },
    {
        "id": 46,
        "name": "Jsquared"
    },
    {
        "id": 83,
        "name": "Kasamba"
    },
    {
        "id": 127,
        "name": "Kitchen Scramble"
    },
    {
        "id": 18,
        "name": "LOVOO"
    },
    {
        "id": 148,
        "name": "Left To Survive"
    },
    {
        "id": 41,
        "name": "Leovegas"
    },
    {
        "id": 139,
        "name": "Lightning Link Casino Slo"
    },
    {
        "id": 73,
        "name": "Likee"
    },
    {
        "id": 179,
        "name": "Lily’s Garden"
    },
    {
        "id": 10,
        "name": "Lollipop Match3"
    },
    {
        "id": 11,
        "name": "Lollipop2 Match3"
    },
    {
        "id": 16,
        "name": "Lords Mobile"
    },
    {
        "id": 124,
        "name": "Lotsa Slots"
    },
    {
        "id": 116,
        "name": "Lucky Time Slots"
    },
    {
        "id": 23,
        "name": "MBOffer 1"
    },
    {
        "id": 134,
        "name": "MGM Slots Live"
    },
    {
        "id": 169,
        "name": "MPL"
    },
    {
        "id": 96,
        "name": "Magic Jigsaw Puzzle"
    },
    {
        "id": 55,
        "name": "Magic Tales"
    },
    {
        "id": 34,
        "name": "MakeMyTrip"
    },
    {
        "id": 185,
        "name": "Match Masters"
    },
    {
        "id": 85,
        "name": "Million Lords"
    },
    {
        "id": 42,
        "name": "Miracle Nikki"
    },
    {
        "id": 22,
        "name": "MobiKwik"
    },
    {
        "id": 47,
        "name": "Momento"
    },
    {
        "id": 70,
        "name": "Monopoly Slots"
    },
    {
        "id": 115,
        "name": "My Vegas"
    },
    {
        "id": 143,
        "name": "MyVegas Bingo"
    },
    {
        "id": 104,
        "name": "Mystic Slots"
    },
    {
        "id": 150,
        "name": "Neverland Casino"
    },
    {
        "id": 38,
        "name": "NordVPN"
    },
    {
        "id": 17,
        "name": "Oceans And Empires"
    },
    {
        "id": 57,
        "name": "Omiai"
    },
    {
        "id": 63,
        "name": "Paters"
    },
    {
        "id": 126,
        "name": "Peak"
    },
    {
        "id": 114,
        "name": "Pirate Kings"
    },
    {
        "id": 135,
        "name": "Poker Face"
    },
    {
        "id": 37,
        "name": "QualityServe"
    },
    {
        "id": 29,
        "name": "Quick Hit Slots"
    },
    {
        "id": 45,
        "name": "Roll The Ball"
    },
    {
        "id": 149,
        "name": "Rush Royale"
    },
    {
        "id": 56,
        "name": "Sado (Royal Road)"
    },
    {
        "id": 163,
        "name": "Scatter Slots"
    },
    {
        "id": 82,
        "name": "Shopkick"
    },
    {
        "id": 27,
        "name": "Slotomania"
    },
    {
        "id": 165,
        "name": "Slots Era"
    },
    {
        "id": 170,
        "name": "Smurfs Magic Match"
    },
    {
        "id": 109,
        "name": "Solitaire Cash"
    },
    {
        "id": 186,
        "name": "Solitaire Clash"
    },
    {
        "id": 155,
        "name": "Solitaire Fortune"
    },
    {
        "id": 98,
        "name": "Solitaire Grand Harvest"
    },
    {
        "id": 102,
        "name": "Solitaire Pets"
    },
    {
        "id": 164,
        "name": "Solitaire Smash"
    },
    {
        "id": 144,
        "name": "Solitaire TriPeaks"
    },
    {
        "id": 133,
        "name": "Solitaire TriPeaks Journe"
    },
    {
        "id": 52,
        "name": "Sportsbook"
    },
    {
        "id": 112,
        "name": "Star Slots"
    },
    {
        "id": 44,
        "name": "The Kingdom"
    },
    {
        "id": 48,
        "name": "Tokopedia"
    },
    {
        "id": 119,
        "name": "Traffic Puzzle"
    },
    {
        "id": 31,
        "name": "Travelocity"
    },
    {
        "id": 89,
        "name": "Tycoon Casino"
    },
    {
        "id": 7,
        "name": "Uber Cab"
    },
    {
        "id": 54,
        "name": "Vegas"
    },
    {
        "id": 90,
        "name": "Vegas Casino Slots"
    },
    {
        "id": 173,
        "name": "VelvetThunder"
    },
    {
        "id": 80,
        "name": "Videogame Guardians"
    },
    {
        "id": 50,
        "name": "Vuclip_MC"
    },
    {
        "id": 32,
        "name": "Wadi"
    },
    {
        "id": 168,
        "name": "War Robots"
    },
    {
        "id": 79,
        "name": "William Hill Sports"
    },
    {
        "id": 129,
        "name": "Willy Wonka"
    },
    {
        "id": 74,
        "name": "Winstar"
    },
    {
        "id": 128,
        "name": "Wizard of Oz"
    },
    {
        "id": 12,
        "name": "Word Cookies"
    },
    {
        "id": 108,
        "name": "World Series of Poker"
    },
    {
        "id": 19,
        "name": "Zigbang"
    },
    {
        "id": 136,
        "name": "Zynga Poker"
    },
    {
        "id": 69,
        "name": "audible"
    },
    {
        "id": 76,
        "name": "konami_slots"
    },
    {
        "id": 75,
        "name": "pop_slots"
    },
    {
        "id": 61,
        "name": "wakuwaku-mail"
    }
]

