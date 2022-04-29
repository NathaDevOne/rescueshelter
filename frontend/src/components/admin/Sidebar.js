import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#chartSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fa fa-chart-bar"></i> Charts</a>
                        <ul className="collapse list-unstyled" id="chartSubmenu">
                            <li>
                                <Link to="/admin/rescuedcharts"><i class="fa fa-calendar"></i> Rescued</Link>
                            </li>

                            <li>
                                <Link to="/admin/adoptedcharts"><i class="fa fa-calendar"></i> Adopted</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/rescues"><i className="fa fa-cat"></i> Rescues</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-user-tie"></i> Personnels</Link>
                    </li>

                    <li>
                        <Link to="/admin/adopters"><i className="fa fa-user"></i> Adopters</Link>
                    </li>

                    <li>
                        <a href="#healthSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-briefcase-medical"></i> Health</a>
                        <ul className="collapse list-unstyled" id="healthSubmenu">
                            <li>
                                <Link to="/admin/diseases"><i className="fa fa-virus"></i> Diseases</Link>
                            </li>

                            <li>
                                <Link to="/admin/injuries"><i className="fa fa-crutch"></i> Injuries</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/requests"><i className="fa fa-hand-holding-heart"></i> Adoptions</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar